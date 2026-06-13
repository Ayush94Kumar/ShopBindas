import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold' >Easy Exchange Policy</p>
        <p className='text-gray-600'>Easy exchanges with no unnecessary delays.</p>
        </div>
        <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold' >7 Days return Policy</p>
        <p className='text-gray-600'>Return your purchase within 7 days</p>
        </div>
        <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold' >Best Customer Supoort</p>
        <p className='text-gray-600'>Our support team is available to assist you</p>
        </div>
    </div>
  )
}

export default OurPolicy