import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Packages from './Pages/Packages';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Navbar from './Pages/Navbar/Navbar';
import Footer from './Pages/Footer/Footer';

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
      </Routes>
      <Footer/>
    </BrowserRouter>
      
    </>
  )
}

export default App
