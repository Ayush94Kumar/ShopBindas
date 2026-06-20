import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext);

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'Price'} text2={'Details'}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
            <p className='font-serif'>SubTotal</p>
            <p>{currency} {getCartAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p className='font-serif'>Delivery Fee</p>
            <p>{currency }{delivery_fee}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <b className='font-serif'>Total Amount</b>
            <b>{currency}{getCartAmount()===0? 0:getCartAmount()+delivery_fee}.00</b>
        </div>
        </div>
    </div>
  )
}

export default CartTotal