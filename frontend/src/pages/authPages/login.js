import React from 'react';
import useForm from '../../hooks/useRegister';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/registerApi';

export default function Login() {
  const [values, handleChange, resetForm] = useForm({ email: "", password: '' });
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const result = await login(values);
      
      if (result && result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
        
        alert("Login Successful!");
        if (result.user.role === 'admin') {
          navigate('/admin/dashboard'); 
        } else {
          navigate('/tracking'); 
        }
      }
    } catch (error) {
      console.error("Login Error:", error);

      alert(error.response?.data?.message || "Login Failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] p-4">
      <div className="w-full max-w-md bg-white p-10 rounded-sm shadow-2xl relative">
        <a href='/' className="absolute top-4 right-4 text-teal-400 text-xl font-light">✕</a>
        <div className="flex items-center justify-center space-x-2 mb-10">
          <span className="h-1 w-3 bg-blue-500"></span>
          <h2 className="text-3xl font-bold text-center text-[#00bcd4] tracking-tight uppercase">
            Login Form
          </h2>
          <span className="h-1 w-3 bg-blue-500"></span>
        </div>

        <form className="space-y-6" onSubmit={submitForm}>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border-b border-teal-400 py-2 focus:outline-none focus:border-blue-500 bg-transparent transition-colors"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full border-b border-teal-400 py-2 focus:outline-none focus:border-blue-500 bg-transparent transition-colors"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0097a7] to-[#00e5ff] text-white py-3 rounded-md font-bold uppercase tracking-wider shadow-md hover:opacity-90 transition duration-300 mt-4 active:scale-95"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}