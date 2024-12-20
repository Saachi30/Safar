import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Packages from './Pages/Packages';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Navbar from './Pages/Navbar/Navbar';
import Footer from './Pages/Footer/Footer';
import TravelPref from './Pages/TravelPref';
import Plan from './Pages/Plan';
import Itinerary from './Itinerary';
import ProfilePage from './Pages/Profile/ProfilePage';

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='about'element={<About/>}/>
        <Route path='packages'element={<Packages/>}/>
        <Route path='contact'element={<Contact/>}/>
        <Route path='travelpref' element={<TravelPref/>}/>
        <Route path = 'plan' element={<Plan/>}/>
        <Route path='itinerary' element={<Itinerary/>}/>
        <Route path='profilepage' element={<ProfilePage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
      
    </>
  )
}

export default App
