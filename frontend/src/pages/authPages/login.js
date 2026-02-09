import React from 'react';
import useForm from '../../hooks/useHooks';

export default function Login(){
const [formData, handleEvent] = useForm({email: "", password: ''})

const submitForm = (e) => {
  e.preventDefault()
  console.log(formData)
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={submitForm}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 mt-2">
              Email
            </label>
            <input
            name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleEvent}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
            name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleEvent}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};