import React from 'react';
import {Routes, Route} from 'react-router-dom';
import WelcomePage from './pages/welcomePage';
import Register from './pages/authPages/register';
import Login from './pages/authPages/login';
import BookingPage from './pages/bookingPage';
import TrackingPage from './pages/trackingPage';


export default function App(){
  return(
    <Routes>
      <Route path='/' element={<WelcomePage />}></Route>
      <Route path='/signup' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/booking' element={<BookingPage />}></Route>
      <Route path='/tracking' element={<TrackingPage />}></Route>
    </Routes>
  )
}
