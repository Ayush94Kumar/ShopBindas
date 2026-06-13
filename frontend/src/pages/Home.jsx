import React, { Component } from 'react'
import Home_front from '../components/Home_front'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
const Home = () => {
  return (
    <div>
      <Home_front/>
      <LatestCollection/>
      <BestSeller/>
    </div>
  )
}

export default Home