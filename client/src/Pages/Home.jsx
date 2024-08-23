import React from 'react'
import Hero from './Home/Hero';
import Popular from './Home/Popular';
import ChooseUs from './Home/ChooseUs';

function Home() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Hero/>
      <Popular/>
      <ChooseUs/>
    </div>
  )
}

export default Home