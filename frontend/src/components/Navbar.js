import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    toast.success("Logged out successfully");
    navigate('/login');
  };

  return (
    <nav className="bg-[#1e293b] text-white p-4 flex justify-between items-center shadow-lg">
      <Link title='Home' to="/" className="text-xl font-black tracking-widest text-blue-400">SantE'</Link>
      
      <div className="flex gap-6 items-center">
        {user ? (
          <>
            <Link to="/booking" className="text-sm hover:text-blue-300">Book Now</Link>
            <Link to="/tracking" className="text-sm hover:text-blue-300">My Bookings</Link>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-xs font-bold transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-600 px-4 py-2 rounded-lg text-xs font-bold">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;