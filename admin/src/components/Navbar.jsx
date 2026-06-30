import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
       <div className='flex items-center justify-between py-5 font medium'>
                <img src={assets.company_logo} className="w-12 " alt="company_Logo" />
                <img src={assets.logo} className="w-36" alt="Logo" />
            </div>
      <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm font-serif cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar