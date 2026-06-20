import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Cart = () => {
     const {products,currency, cartItems,updateQuantity}=useContext(ShopContext);
     // 2. Local state to store the transformed, flat array of cart items
     const [cartData,setCartData] = useState([]);

     useEffect(()=>{
      const tempData = [];
      // Loop through each product ID in the cart
      for(const p_id in cartItems)
      {
        // Loop through each size of that specific product
        for(const size in cartItems[p_id])
        {
          // If the quantity is greater than 0, push it to our flat array
          if(cartItems[p_id][size]>0)
          {
            tempData.push({
              _id:p_id,
              size:size,
              quantity:cartItems[p_id][size]
            })
          }
        }
      }    
      // Update the local state with the newly created flat array  
     setCartData(tempData);      
     },[cartItems])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
          <Title text1={'YOUR'} text2={'CART'}/>
      </div>
      <div>
        {
          //Loop through the flattened cart array to render each item
          cartData.map((item,index)=>{
            // Find the full product details (like name, image, price) matching this cart item's ID
            const productData = products.find((product) => product._id===item._id);
            return (
              <div className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                    <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                    <div>
                      <p className='text-xs sm:text-lg font-serif'>{productData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                            <p>{currency}{productData.price}</p>
                            <p className='px-2 sm:px-3 sm:py-1 border  bg-slate-50'>{item.size}</p>
                      </div>
                    </div>
                </div>
                  <input onChange={(e)=>e.target.value==='' || e.target.value==='0'? null:updateQuantity(item._id,item.size,Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
                  <img onClick={()=>updateQuantity(item._id,item.size,0)} className='w-4 mr-4 sm:w-5  cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default Cart