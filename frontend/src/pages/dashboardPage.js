import { useNavigate } from 'react-router-dom';
import { ClipboardList, Sparkles, ArrowRight } from 'lucide-react';
import dashboard from '../assets/dashboard.jpg'

const Dashboard = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-slate-800">
              Welcome back, <span className="text-blue-600">{userData?.name || 'Guest'}</span>! ✨
            </h1>
            <p className="text-slate-500">Ready for your transformation today?</p>
          </div>
          <div className='flex flex-row'>
            <button 
             onClick={() => navigate('/login')} 
             className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors">Logout</button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-[30px] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
              <Sparkles size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Book a Service</h2>
            <p className="text-slate-500 mb-6">Explore our premium hair, skin, and bridal treatments.</p>
            <button 
              onClick={() => navigate('/booking')}
              className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
            >
              Go to Services <ArrowRight size={18} />
            </button>
          </div>

          <div className="bg-white p-8 rounded-[30px] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform">
              <ClipboardList size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">My Appointments</h2>
            <p className="text-slate-500 mb-6">Check your scheduled timings and booking status.</p>
            <button 
              onClick={() => navigate('/tracking')}
              className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
            >
              View Bookings
            </button>
          </div>
        </div>
        <div className="rounded-[40px] overflow-hidden relative h-64 shadow-2xl">
          <img 
            src={dashboard}
            alt="Salon Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent flex items-center p-10">
            <p className="text-white text-3xl font-bold max-w-xs">Style is a way to say who you are without having to speak.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;