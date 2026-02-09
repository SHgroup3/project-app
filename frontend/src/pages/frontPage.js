import React from 'react';

export default function FrontPage(){
    return(
        <div className="flex flex-col min-h-screen flex items-center justify-center bg-gray-100">
        <label className='flex flex-col'>
      <span>Select a Service</span>
      <select className='px-4 py-2 border rounded-full'>
        <option value=""></option>
        <option>apple </option>
      </select>      </label>
      </div>  
    
    )
}