import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    // div for footer
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      {/* overview of company */}
        <div>
            <div className='flex items-center gap-0'>
             <img src={assets.company_logo} alt="" className='w-12' />
            <img src={assets.logo} alt="" className='w-32'/>
            </div>
            <p className='w-full md:w-2/3 text-gray-600 font-serif'>
            ShopBindas is your ultimate destination for the latest trends and everyday essentials. We are committed to delivering high-quality products, a seamless shopping experience, and reliable customer service right to your doorstep.
            </p>
        </div>
        {/* website functions */}
        <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-1 text-gray-600 font-serif'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
      {/* how to contect */}
        <div>
            <p className='text-xl font-medium mb-5'>Get In Touch</p>
            <ul className='flex flex-col gap-1 text-gray-600 font-serif'>
                <li>+1-76-47-5454</li>
                <li>contect@shopbindash.com</li>
            </ul>
        </div>
        {/* Footer Bottom */}
    <div className='col-span-full'>
        <hr />
        <p className='py-5 text-sm text-center font-serif'>
            Copyright 2026©ShopBindas.com - All Rights Reserved
        </p>
    </div>
        </div>
  )
}

export default Footer