import React, { useEffect, useState } from 'react';
import { getAllBookingsApi, updateBookingStatusApi } from '../services/registerApi';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const data = await getAllBookingsApi();
      setBookings(data);
    } catch (err) {
      console.log("Error fetching data", err);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const handleStatus = async (id, newStatus) => {
    try {
      await updateBookingStatusApi(id, newStatus);
      alert(`Booking ${newStatus}!`);
      getBookings(); 
    } catch (err) {
      alert("Status update failed");
    }
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin - Manage Bookings</h1>
      
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-semibold text-gray-700">Customer</th>
              <th className="p-4 font-semibold text-gray-700">Service</th>
              <th className="p-4 font-semibold text-gray-700">Schedule</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
              <th className="p-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="font-medium text-gray-900">{item.user?.name || 'N/A'}</div>
                  <div className="text-sm text-gray-500">{item.user?.email}</div>
                </td>
                <td className="p-4 text-gray-700">{item.service}</td>
                <td className="p-4 text-gray-700">{item.schedule}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    item.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                    item.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  <button 
                    onClick={() => handleStatus(item._id, 'confirmed')}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Confirm
                  </button>
                  <button 
                    onClick={() => handleStatus(item._id, 'cancelled')}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}