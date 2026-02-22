import React from "react";
import useForm from "../../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { register } from '../../services/registerApi';
import toast, { Toaster } from 'react-hot-toast'; // Professional notifications

const Register = () => {
  const navigate = useNavigate();
  const [values, handleChange, resetForm] = useForm({
    name: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

  // Pakistani Phone Validation Logic
  const isPhoneValid = (phone) => {
    const regex = /^(03)[0-9]{9}$/;
    return regex.test(phone);
  };

  const submit = async (e) => {
    e.preventDefault();

    // Validations
    if (!isPhoneValid(values.phoneNumber)) {
      toast.error("Please enter a valid Pakistani number (e.g., 03001234567)");
      return;
    }

    if (values.password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    // Loading Toast (Professional touch)
    const loadingToast = toast.loading("Creating your account...");

    try {
      const result = await register(values);
      toast.success("Account Created Successfully! Welcome!", { id: loadingToast });
      resetForm();
      
      // Thora delay taake user message parh sake
      setTimeout(() => navigate('/login'), 2000); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed!", { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] p-4 font-sans">
      {/* Ye component toast messages dikhane ke liye zaroori hai */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-md bg-white p-10 rounded-sm shadow-2xl relative">
        <a href="/" className="absolute top-4 right-4 text-teal-400 text-xl hover:text-red-500 transition-colors">✕</a>
        
        <div className="flex items-center justify-center space-x-2 mb-10">
          <span className="h-1 w-3 bg-blue-500"></span>
          <h2 className="text-3xl font-bold text-center text-[#00bcd4] tracking-tight">
            Registration Form
          </h2>
          <span className="h-1 w-3 bg-blue-500"></span>
        </div>

        <form className="space-y-4" onSubmit={submit}>
          {/* Name Field */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-1">Name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="Enter your name"
              className="border-b border-teal-400 py-2 focus:outline-none focus:border-blue-500 transition-all"
              value={values.name}
              onChange={handleChange}
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="border-b border-teal-400 py-2 focus:outline-none focus:border-blue-500 transition-all"
              value={values.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone Number Field with Validation Styling */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-1">Phone Number</label>
            <input
              name="phoneNumber"
              type="tel"
              required
              maxLength="11"
              placeholder="03001234567"
              className={`border-b py-2 focus:outline-none transition-all ${
                values.phoneNumber.length > 0 && !isPhoneValid(values.phoneNumber) 
                ? 'border-red-500' : 'border-teal-400 focus:border-blue-500'
              }`}
              value={values.phoneNumber}
              onChange={handleChange}
            />
            {values.phoneNumber.length > 0 && !isPhoneValid(values.phoneNumber) && (
              <p className="text-red-500 text-[10px] mt-1 italic leading-tight">
                * Format: 03xxxxxxxxx (11 digits)
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="Min 8 characters"
              className="border-b border-teal-400 py-2 focus:outline-none focus:border-blue-500 transition-all"
              value={values.password}
              onChange={handleChange}
            />
            {values.password.length > 0 && values.password.length < 8 && (
              <p className="text-red-500 text-[10px] mt-1 italic">
                * Too short ({8 - values.password.length} more to go)
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-[#0097a7] to-[#00e5ff] text-white py-3 font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition duration-300 active:scale-95"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;