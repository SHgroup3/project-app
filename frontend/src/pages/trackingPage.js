import React, { useEffect, useState } from 'react';
import { PlusCircle, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserBooking, cancelBooking } from '../services/registerApi';
import { PageWrapper } from "../components/index";

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

  if (loading) return <div className="flex justify-center items-center h-screen text-xl font-bold text-blue-600 animate-pulse">Loading Your Style...</div>;

  return (
    <PageWrapper title="Your Salon History">
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-blue-900 italic tracking-tighter">
              {userBookings.length === 0 ? "Discover Services" : "My Services"}
            </h1>
            <p className="text-gray-500 font-medium">
              {userBookings.length === 0 ? "Ready for a new look? Choose a service below." : "Track your scheduled salon visits"}
            </p>
          </div>
          {userBookings.length > 0 && (
            <button 
              onClick={() => navigate('/booking')}
              className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95"
            >
              <PlusCircle size={20} /> Book New
            </button>
          )}
        </div>
           <button 
             onClick={() => navigate('/dashboard')} 
             className="mb-4 text-blue-600 flex items-center gap-2 font-bold">← Back to Home</button>

{userBookings.length === 0 ? (
  <div className="space-y-12 animate-in fade-in duration-700">
    <div className="text-center py-12 bg-white rounded-[40px] shadow-xl shadow-blue-50 border-2 border-dashed border-blue-100">
      <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Calendar size={40} className="text-blue-200" />
      </div>
      <h2 className="text-3xl font-black text-blue-900">No Bookings Found</h2>
      <p className="text-gray-500 mt-2 font-medium">
        It looks like you haven't scheduled any services yet. <br />
        Explore our popular services below to get started!
      </p>
    </div>
    <div className="pt-8 w-full flex justify-center">
    <button 
              onClick={() => navigate('/booking')}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-12 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-30"
            >
              <PlusCircle size={20} /> Book Now
            </button>
            </div>
  </div>
) : (

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    {userBookings.map((booking) => {
      const isCancelled = booking.status === 'cancelled';
      const scheduleParts = booking.schedule?.split(' at ') || ["No Date", "No Time"];
      
      return (
        <div key={booking._id} className="bg-white rounded-[35px] overflow-hidden shadow-2xl shadow-blue-100 border border-gray-50 transition-transform hover:scale-[1.02]">
          <div className={`p-5 flex justify-between items-center text-white ${isCancelled ? 'bg-gray-400' : 'bg-blue-600'}`}>
            <h3 className="font-black text-lg capitalize">{booking.service}</h3>
            <span className="text-[10px] font-bold px-3 py-1 bg-white/20 rounded-full uppercase tracking-widest">
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
              <span className="text-sm">{scheduleParts[1]}</span>
            </div>
            <div className="pt-6 border-t border-gray-100 text-center">
              {isCancelled ? (
                <p className="text-red-500 font-black uppercase text-sm tracking-tighter">CANCELLED</p>
              ) : (
                <button 
                  onClick={() => handleCancel(booking._id)}
                  className="w-full py-3 text-red-500 font-bold rounded-2xl border border-red-100 hover:bg-red-50 transition-colors"
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
)}
      </div>
    </PageWrapper>
  );
};

export default TrackingPage;
