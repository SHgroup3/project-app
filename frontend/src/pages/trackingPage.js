import React, { useEffect, useState } from 'react';
import { PlusCircle, Calendar, Clock, Scissors } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserBooking, cancelBooking } from '../services/registerApi';
import { Card, PageWrapper } from "../components/index";

const TrackingPage = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData?._id) {
        try {
          const data = await getUserBooking(userData._id);
          setUserBookings(data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate('/login');
      }
    };
    fetchBookings();
  }, [navigate]);

  const handleCancel = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await cancelBooking(bookingId);
        setUserBookings(prev => 
          prev.map(b => b._id === bookingId ? { ...b, status: 'cancelled' } : b)
        );
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  if (loading) return <div className="text-center p-20 font-bold text-blue-600">Loading...</div>;

  return (
    <PageWrapper title="Your Salon History">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-blue-900 italic tracking-tighter">My Services</h1>
            <p className="text-gray-500 font-medium">Track your scheduled salon visits</p>
          </div>
          <button 
            onClick={() => navigate('/booking')}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition-all active:scale-95"
          >
            <PlusCircle size={20} /> Book New
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {userBookings.map((booking) => {
            const isCancelled = booking.status === 'cancelled';
            const scheduleParts = booking.schedule.split(' at ');
            
            return (
              <div key={booking._id} className="bg-white rounded-[35px] overflow-hidden shadow-2xl shadow-blue-100 border border-gray-50 transition-transform hover:scale-[1.02]">
                <div className="bg-blue-600 p-5 flex justify-between items-center text-white">
                  <h3 className="font-black text-lg capitalize">{booking.service}</h3>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${isCancelled ? 'bg-yellow-400 text-yellow-900' : 'bg-yellow-400 text-yellow-900'}`}>
                    {booking.status || 'pending'}
                  </span>
                </div>
                <div className="p-8 space-y-5">
                  <div className="flex items-center gap-4 text-blue-900 font-semibold">
                    <Calendar size={20} className="text-blue-500" />
                    <span className="text-sm">{scheduleParts[0]}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-blue-900 font-semibold">
                    <Clock size={20} className="text-blue-500" />
                    <span className="text-sm">{scheduleParts[1] || "Flexible Time"}</span>
                  </div>

                  <div className="flex items-center gap-4 text-blue-900 font-semibold">
                    <Scissors size={20} className="text-blue-500" />
                    <span className="text-sm">Salon Appointment</span>
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    {isCancelled ? (
                      <p className="text-center text-red-500 font-black uppercase text-sm tracking-tighter">
                        THIS BOOKING WAS CANCELLED
                      </p>
                    ) : (
                      <button 
                        onClick={() => handleCancel(booking._id)}
                        className="w-full py-3 bg-white border-2 border-red-50 text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-colors shadow-sm"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
};

export default TrackingPage;