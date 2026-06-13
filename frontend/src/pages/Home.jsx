import React, { Component } from 'react'
import Home_front from '../components/Home_front'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
const Home = () => {
  return (
    <div>
      <Home_front/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
    </div>
  )
}

export default Home