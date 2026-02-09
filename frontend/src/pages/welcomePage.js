import React from 'react'

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className='flex flex-row'>
       <a href="/signup"
        className='bg-blue-600 border rounded-2xl text-2xl font-bold py-2 px-4'>Sign up</a>
        <a href="/login"
         className='hover:bg-blue-600 border rounded-2xl text-2xl ml-2 py-2 px-4 font-bold'>
            Login </a>
    </div>
    </div>
    
  )
}

export default WelcomePage
