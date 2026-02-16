import React from 'react'
import salon from '../assets/salon.jpg'

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] p-6">
      
      <div className="flex flex-col items-center max-w-lg w-full bg-white/20 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
        <div className="mb-8 overflow-hidden rounded-2xl shadow-lg border-4 border-white">
          <img 
            src={salon}
            alt='cute salon'
            className="w-full h-auto transform hover:scale-110 transition duration-700 ease-in-out"
          />
        </div>
        <h1 className="text-3xl font-bold text-white mb-6 tracking-wide text-center drop-shadow-md">
          Welcome to Our Salon
        </h1>
        <div className='flex flex-row space-x-4 w-full justify-center'>
          <a href="/signup"
            className='bg-white text-[#3a7bd5] border-none rounded-xl text-xl font-bold py-3 px-8 shadow-lg hover:bg-cyan-50 transition duration-300 w-1/2 text-center uppercase tracking-wider'>
            Sign up
          </a>
          
          <a href="/login"
            className='bg-transparent border-2 border-white text-white rounded-xl text-xl font-bold py-3 px-8 hover:bg-white hover:text-[#3a7bd5] transition duration-300 w-1/2 text-center uppercase tracking-wider'>
            Login
          </a>
        </div>

      </div>
    </div>
  )
}

export default WelcomePage