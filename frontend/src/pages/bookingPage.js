import { useState } from 'react';
import { ChevronRight, Clock, CheckCircle2, Calendar } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../services/registerApi';

const BookingPage = () => {
  const { 
    selectedService, 
    setSelectedService, 
    data: services = [] 
  } = useFetch('http://localhost:5000/api/auth/service');

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();

  const getNextSevenDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
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

    if (!userData || !userData._id) {
      alert("Please login first!");
      navigate('/login');
      return;
    }

    if (!selectedDay || !selectedTime) {
      alert("Please select both Date and Time!");
      return;
    }

    try {
      const bookingData = {
        user: userData._id,
        service: selectedService.name,
        schedule: `${selectedDay} at ${selectedTime}`,
      };


      const result = await createBooking(bookingData); 
      
      if (result) {
        console.log("Booking Done!", result);
        navigate('/tracking', { 
          state: { 
            service: selectedService, 
            schedule: `${selectedDay} @ ${selectedTime}`,
            bookingId: result.booking?._id 
          } 
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Booking failed! Make sure you are logged in.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] p-4">
      <div className="max-w-5xl w-full grid md:grid-cols-3 gap-8 bg-white rounded-[32px] shadow-2xl overflow-hidden p-8">
        <div className="md:col-span-1 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl p-8 text-white flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">SantE'</h1>
            <p className="mt-4 text-blue-100 italic">"Your Glow, Our Passion."</p>
          </div>
        </div>
        <form className="md:col-span-2 space-y-8" onSubmit={submitForm}>
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Select Service</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedService(service)}
                  className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-md ${
                    selectedService?.name === service.name ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-white'
                  }`}
                >
                  {selectedService?.name === service.name && (
                    <CheckCircle2 className="absolute top-2 right-2 text-blue-500" size={18} />
                  )}
                  <p className="text-sm font-semibold text-gray-800">{service.name}</p>
                  <p className="text-blue-600 font-bold mt-1">Rs. {service.price}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-blue-500"/> Select Date
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {days.map((day) => (
                <div
                  key={day.fullDate}
                  onClick={() => setSelectedDay(day.fullDate)}
                  className={`flex-shrink-0 w-20 py-4 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                    selectedDay === day.fullDate
                      ? 'border-blue-500 bg-blue-600 text-white'
                      : 'border-gray-100 bg-white text-gray-600'
                  }`}
                >
                  <p className="text-xs uppercase font-bold">{day.displayDay}</p>
                  <p className="text-xl font-black">{day.displayDate}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock size={20} className="text-blue-500"/> Choose Time
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {timeSlots.map((time) => (
                <button
                  type='button'
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    selectedTime === time 
                    ? 'border-blue-500 bg-black text-white' 
                    : 'border-gray-100 text-gray-600 hover:border-blue-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </section>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button type='submit'
              disabled={!selectedService || !selectedDay || !selectedTime}
              className="group flex items-center gap-2 bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-all disabled:opacity-30 shadow-lg"
            >
              Book Now <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;