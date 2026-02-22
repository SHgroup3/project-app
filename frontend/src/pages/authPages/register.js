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

<<<<<<< Updated upstream
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

=======
    if (values.password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

>>>>>>> Stashed changes
    try {
      const result = await register(values);
      toast.success("Account Created Successfully! Welcome!", { id: loadingToast });
      resetForm();
<<<<<<< Updated upstream
      
      // Thora delay taake user message parh sake
      setTimeout(() => navigate('/login'), 2000); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed!", { id: loadingToast });
=======
      navigate('/login');
    } catch (error) {
      console.error("Error saving user:", error);
      alert(error.response?.data?.message || "Registration Failed!");
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          {/* Name Field */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-1">Name</label>
=======
          <div className="flex flex-col w-full">
            <label className="block text-medium font-bold text-gray-600 mb-1 mt-2">Name</label>
>>>>>>> Stashed changes
            <input
              name="name"
              type="text"
              required
              placeholder="Enter your name"
<<<<<<< Updated upstream
              className="border-b border-teal-400 py-2 focus:outline-none focus:border-blue-500 transition-all"
              value={values.name}
              onChange={handleChange}
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-600 mb-1">Email</label>
=======
              className="relative border-b border-teal-400 py-1 focus:outline-none"
              value={values.name}
              onChange={handleChange}
            />

            <label className="block text-medium font-bold text-gray-600 mb-1 mt-2">Email</label>
>>>>>>> Stashed changes
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
<<<<<<< Updated upstream
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
=======
              className="relative border-b border-teal-400 py-1 focus:outline-none"
              value={values.email}
              onChange={handleChange}
            />

            <label className="block text-medium font-bold text-gray-600 mb-1 mt-2">Phone Number</label>
            <input
              name="phoneNumber"
              type="text"
              required
              minLength={7}
              placeholder="Enter phone number"
              className="relative border-b border-teal-400 py-1 focus:outline-none"
              value={values.phoneNumber}
              onChange={handleChange}
            />

            <label className="block text-medium font-bold text-gray-600 mb-1 mt-2">Password</label>
>>>>>>> Stashed changes
            <input
              name="password"
              type="password"
              required
<<<<<<< Updated upstream
              placeholder="Min 8 characters"
              className="border-b border-teal-400 py-2 focus:outline-none focus:border-blue-500 transition-all"
=======
              minLength={8}
              placeholder="Enter password (min 8 characters)"
              className="relative border-b border-teal-400 py-1 focus:outline-none"
>>>>>>> Stashed changes
              value={values.password}
              onChange={handleChange}
            />
            {values.password.length > 0 && values.password.length < 8 && (
<<<<<<< Updated upstream
              <p className="text-red-500 text-[10px] mt-1 italic">
                * Too short ({8 - values.password.length} more to go)
=======
              <p className="text-red-500 text-xs mt-1 italic">
                * Password is too short (needs {8 - values.password.length} more)
>>>>>>> Stashed changes
              </p>
            )}
          </div>

          <button
            type="submit"
<<<<<<< Updated upstream
            className="w-full mt-6 bg-gradient-to-r from-[#0097a7] to-[#00e5ff] text-white py-3 font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition duration-300 active:scale-95"
=======
            className="w-full mt-6 bg-gradient-to-r from-[#0097a7] to-[#00e5ff] text-white py-3 font-bold uppercase tracking-wider shadow-md hover:opacity-90 transition duration-300 active:scale-95"
>>>>>>> Stashed changes
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;