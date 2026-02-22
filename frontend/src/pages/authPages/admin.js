import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Users, Calendar, RefreshCcw } from 'lucide-react';
import { getAllBookings, updateBookingStatus } from '../../services/registerApi'; 

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      const data = await getAllBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateBookingStatus(id, newStatus);
      setBookings(prev => 
        prev.map(b => b._id === id ? { ...b, status: newStatus } : b)
      );
    } catch (error) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="text-center p-20 font-bold text-blue-600">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-blue-900 tracking-tight uppercase italic">Admin Dashboard</h1>
          </div>
          <button 
            onClick={fetchAllBookings}
            className="p-3 bg-white rounded-full shadow-md hover:rotate-180 transition-all duration-500 text-blue-600"
          >
            <RefreshCcw size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[25px] shadow-sm border-l-8 border-blue-500">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-bold">Total Bookings</span>
              <Calendar className="text-blue-500" />
            </div>
            <h2 className="text-3xl font-black mt-2">{bookings.length}</h2>
          </div>
          <div className="bg-white p-6 rounded-[25px] shadow-sm border-l-8 border-green-500">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-bold">Confirmed</span>
              <CheckCircle className="text-green-500" />
            </div>
            <h2 className="text-3xl font-black mt-2">{bookings.filter(b => b.status === 'confirmed').length}</h2>
          </div>
          <div className="bg-white p-6 rounded-[25px] shadow-sm border-l-8 border-red-500">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-bold">Cancelled</span>
              <XCircle className="text-red-500" />
            </div>
            <h2 className="text-3xl font-black mt-2">{bookings.filter(b => b.status === 'cancelled').length}</h2>
          </div>
        </div>
        <div className="bg-white rounded-[35px] shadow-xl overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-5 font-bold uppercase text-sm">Customer</th>
                <th className="p-5 font-bold uppercase text-sm">Service</th>
                <th className="p-5 font-bold uppercase text-sm">Schedule</th>
                <th className="p-5 font-bold uppercase text-sm text-center">Status</th>
                <th className="p-5 font-bold uppercase text-sm text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-blue-50 transition-colors">
                  <td className="p-5">
                    <div className="font-bold text-blue-900">{booking.user?.name || "Unknown"}</div>
                    <div className="text-xs text-gray-500">{booking.user?.email}</div>
                  </td>
                  <td className="p-5 font-semibold capitalize text-gray-700">{booking.service}</td>
                  <td className="p-5 text-sm font-medium text-gray-600">{booking.schedule}</td>
                  <td className="p-5 text-center">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                      ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-3">
                      {booking.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                            className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 shadow-lg shadow-green-100 transition-all"
                            title="Confirm Booking"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                            className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 shadow-lg shadow-red-100 transition-all"
                            title="Cancel Booking"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      {booking.status !== 'pending' && (
                        <span className="text-xs text-gray-400 italic">No Actions</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookings.length === 0 && (
            <div className="p-20 text-center font-bold text-gray-400 uppercase tracking-widest">
              No bookings found in database
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;