import { useState, useEffect } from 'react';
import { ChevronRight, Clock, Calendar, Scissors, Sparkles, ArrowLeft } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { createBooking, checkAvailability } from '../services/registerApi'; 
import toast, { Toaster } from 'react-hot-toast';

const BookingPage = () => {
  const { 
    selectedService, 
    setSelectedService, 
    data: services = [] 
  } = useFetch('http://localhost:5000/api/auth/service');

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSlots, setBookedSlots] = useState({}); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailability = async () => {
      if (selectedDay) {
        try {
          const data = await checkAvailability(selectedDay);
          setBookedSlots(data || {}); 
        } catch (error) {
          console.error("Error fetching availability:", error);
          toast.error("Could not fetch available slots");
        }
      }
    };
    fetchAvailability();
  }, [selectedDay]); 

  const getNextSevenDays = () => {
    const days = [];
    for (let i = 1; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        fullDate: date.toDateString(),
        displayDay: date.toLocaleDateString('en-US', { weekday: 'short' }),
        displayDate: date.getDate(),
      });
    }
    return days;
  };

  const days = getNextSevenDays();
  const timeSlots = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"];

  const submitForm = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData?._id) {
      toast.error("Please login first!");
      navigate('/login');
      return;
    }

    const currentUserId = userData._id;
    const servicesAtThisTime = bookedSlots[selectedTime] || [];
    const allBookingsToday = Object.values(bookedSlots).flat();

    const hasUserBookedToday = allBookingsToday.some(
      (b) => b.userId === currentUserId && b.serviceName === selectedService?.name
    );

    if (hasUserBookedToday) {
      toast.error(`You have already booked ${selectedService?.name} for today!`);
      return;
    }

    const isServiceAlreadyTaken = servicesAtThisTime.some(
      (b) => b.serviceName === selectedService?.name
    );

    if (isServiceAlreadyTaken) {
      toast.error("This service is already booked for this slot!");
      return;
    }

    if (servicesAtThisTime.length >= 4) {
      toast.error("This slot is fully booked!");
      return;
    }

    const loadingToast = toast.loading("Processing...");
    try {
      const result = await createBooking({
        user: userData._id,
        service: selectedService.name,
        schedule: `${selectedDay} at ${selectedTime}`,
      }); 
      
      if (result) {
        toast.success("Appointment Booked!", { id: loadingToast });
        setTimeout(() => navigate('/tracking'), 1500);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Booking failed!";
      toast.error(errorMessage, { id: loadingToast });
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#f0f4f8] p-2 md:p-4 font-sans overflow-hidden">
      <Toaster position="top-center" />
      
      <div className="max-w-6xl w-full h-[95vh] grid md:grid-cols-12 bg-white rounded-[40px] shadow-2xl overflow-hidden relative border border-slate-100">
        <button 
          onClick={() => navigate('/dashboard')}
          className="absolute top-6 left-6 z-50 p-2 bg-white/10 hover:bg-white/30 rounded-full text-white transition-all backdrop-blur-md border border-white/20"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="md:col-span-4 bg-[#1e293b] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          
          <div className="mt-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-blue-400" size={24} />
              <h1 className="text-2xl font-black tracking-widest uppercase">SantE'</h1>
            </div>
            <p className="text-blue-200/60 text-[10px] italic tracking-wider">"Your Glow, Our Passion."</p>

            <div className="mt-8 space-y-4">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Live Summary</h3>
              <div className="space-y-3 bg-white/5 p-5 rounded-[24px] border border-white/5 backdrop-blur-sm">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 italic">Service</span>
                  <span className="font-bold text-blue-400">{selectedService?.name || '---'}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 italic">Time</span>
                  <span className="font-bold text-white">{selectedTime || '---'}</span>
                </div>
                <div className="pt-3 mt-1 border-t border-white/10 flex justify-between items-center">
                  <span className="font-bold text-xs uppercase">Total</span>
                  <span className="font-black text-xl text-blue-400 font-sans">Rs. {selectedService?.price || '0'}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block text-[9px] text-gray-500 font-bold tracking-[0.3em] uppercase opacity-50">Est. 2026</div>
        </div>

        <form className="md:col-span-8 p-6 md:p-10 space-y-6 flex flex-col justify-between bg-white overflow-y-auto scroll-smooth" onSubmit={submitForm}>
          <section>
            <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <Scissors size={18} className="text-blue-600"/> All Services
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
              {services.map((service, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedService(service)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedService?.name === service.name 
                    ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
                    : 'border-slate-50 hover:border-blue-100 hover:bg-slate-50/50'
                  }`}
                >
                  <p className={`text-md font-bold mb-1 ${selectedService?.name === service.name ? 'text-blue-700' : 'text-slate-500'}`}>
                    {service.name}
                  </p>
                  <p className="text-slate-900 font-black text-sm font-sans italic">Rs. {service.price}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-blue-600"/> Preferred Date
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {days.map((day) => (
                <div
                  key={day.fullDate}
                  onClick={() => setSelectedDay(day.fullDate)}
                  className={`flex-shrink-0 w-16 py-3 rounded-[20px] border-2 text-center transition-all cursor-pointer ${
                    selectedDay === day.fullDate 
                    ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'border-slate-50 bg-slate-50 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  <p className="text-[8px] uppercase font-black mb-1">{day.displayDay}</p>
                  <p className="text-lg font-black font-sans">{day.displayDate}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <Clock size={18} className="text-blue-600"/> Available Time
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {timeSlots.map((time) => {
                const userData = JSON.parse(localStorage.getItem('user'));
                const currentUserId = userData?._id;
                const servicesAtThisTime = bookedSlots[time] || [];
                const isSlotFull = servicesAtThisTime.length >= 4;
                const isServiceAlreadyTaken = servicesAtThisTime.some(
                  (b) => b.serviceName === selectedService?.name
                );

                const allBookingsToday = Object.values(bookedSlots).flat();
                const hasUserBookedToday = allBookingsToday.some(
                  (b) => b.userId === currentUserId && b.serviceName === selectedService?.name
                );

                const isDisabled = isSlotFull || isServiceAlreadyTaken || hasUserBookedToday;

                return (
                  <button
                    type='button' 
                    key={time} 
                    disabled={isDisabled}
                    onClick={() => setSelectedTime(time)}
                    className={`
                      py-4 px-2 rounded-2xl border-2 font-bold text-sm transition-all duration-200
                      ${isDisabled 
                        ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed opacity-60' 
                        : selectedTime === time 
                          ? 'border-blue-600 bg-blue-600 text-white shadow-md' 
                          : 'border-slate-200 text-slate-600 hover:border-blue-400 bg-white'
                      }
                    `}
                  >
                    {time}
                    {hasUserBookedToday && (
                       <span className="block text-[8px] text-orange-400 mt-1 uppercase italic">Booked Today</span>
                    )}
                    {isServiceAlreadyTaken && !hasUserBookedToday && (
                      <span className="block text-[9px] text-red-400 mt-1 uppercase">Taken</span>
                    )}
                    {isSlotFull && (
                      <span className="block text-[9px] text-gray-400 mt-1 uppercase">Full</span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          <div className="pt-4">
            <button type='submit'
              disabled={!selectedService || !selectedDay || !selectedTime}
              className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-[22px] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all disabled:opacity-20 shadow-xl shadow-blue-100 active:scale-95"
            >
              Confirm Appointment <ChevronRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;