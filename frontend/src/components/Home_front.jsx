import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom' 

const Home_front = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 '>
      {/* left */}
      <img onClick={() => navigate('/product/aabad')} className='w-full sm:w-1/2 cursor-pointer' src={assets.hero_img} alt="hero" />
      {/* right */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-serif text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 class="font-serif text-3xl sm:py-3 lg:text-5xl leading-relaxed">Trending & Premium</h1>
          <div className='flex items-center gap-2'>
            <p className='font-serif text-sm md:text-base'>Shop Now</p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home_front
