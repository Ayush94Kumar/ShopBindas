import React from 'react'
import { assets } from '../assets/assets'
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
          <NavLink className='flex items-center gap-3 border border-gray-500 border-r-0 px-3 py-3 rounded-l' to="/add">
            <img className='w-5 h-5' src={assets.add_icon} alt="" />
            <p className='hidden md:block font-serif'>Add Items</p>
          </NavLink>
           <NavLink className='flex items-center gap-3 border border-gray-500 border-r-0 px-3 py-3 rounded-l' to="/list">
            <img className='w-5 h-5' src={assets.order_icon} alt="" />
            <p className='hidden md:block font-serif '>List Items</p>
          </NavLink>
           <NavLink className='flex items-center gap-3 border border-gray-500 border-r-0 px-3 py-3 rounded-l' to="/order">
            <img className='w-5 h-5' src={assets.order_icon} alt="" />
            <p className='hidden md:block font-serif'>Orders</p>
          </NavLink>
        </div>
    </div>
  )
}

export default Sidebar