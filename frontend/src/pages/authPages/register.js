import React from "react";
import useForm from "../../hooks/useRegister";
import { register } from '../../services/registerApi';

const Register = () => {
  const [values, handleChange, resetForm] = useForm({
    name: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const result = await register(values);
      console.log("User registered:", result);
      alert("Registration Successful!");
      resetForm();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Registration Failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] p-4">
      <div className="w-full max-w-md bg-white p-10 rounded-sm shadow-2xl relative">
        <a href="/" className="absolute top-4 right-4 text-teal-400 text-xl font-light">✕</a>
        <div className="flex items-center justify-center space-x-2 mb-10">
          <span className="h-1 w-3 bg-blue-500"></span>
          <h2 className="text-3xl font-bold text-center text-[#00bcd4] tracking-tight">
            Registration Form
          </h2>
          <span className="h-1 w-3 bg-blue-500"></span>
        </div>
         <form className="space-y-4" onSubmit={submit}>

          <div>

              <div className="space-x-2">

            <div className="flex flex-col w-full">

            <label className="block text-medium font-bold text-gray-600 mb-1 mt-2">Name
            </label><input
               name="name"
               type="text"
               placeholder="Enter your name"
               className="relative border-b border-teal-400 py-1 focus: outline-none"
               value={values.name}
               onChange={handleChange} />
               <label className="block text-medium font-bold text-gray-600 mb-1 mt-2">Email
            </label><input
               name="email"
               type="email"
               placeholder="Enter your email"
               className="relative border-b border-teal-400 py-1 focus: outline-none"
               value={values.email}
               onChange={handleChange} />
               <label className="block text-medium font-bold text-gray-600 mb-1 mt-2">Phone Number
            </label><input
               name="phoneNumber"
               type="number"
               placeholder="Enter phone number"
               className="relative border-b border-teal-400 py-1 focus: outline-none"
               value={values.phoneNumber}
               onChange={handleChange} />
               <label className="block text-medium font-bold text-gray-600 mb-1 mt-2">Password
            </label><input
               name="password"
               type="password"
               placeholder="Enter password"
               className="relative border-b border-teal-400 py-1 focus: outline-none"
               value={values.password}
               onChange={handleChange} />

               </div></div></div>

  <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0097a7] to-[#00e5ff] text-white py-3 font-bold uppercase tracking-wider shadow-md hover:opacity-90 transition duration-300"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;