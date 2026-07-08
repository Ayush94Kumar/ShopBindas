import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios';

const Orders = () => {
  // Access global data and functions from Shop Context
  const { backendURL, token, products, currency } = useContext(ShopContext);
  // Stores all the user's ordered items
  const [orderData, setorderData] = useState([]);

  // Fetch all orders placed by the logged-in user
  const loadOrderData = async () => {
    try {
      // Stop execution if the user is not logged in
      if (!token) {
        return null;
      }
      // Request user's order history from the backend
      const response = await axios.post(backendURL + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        // Flatten all order items into a single array
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            // Attach order details to each product
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item);
          })
        })
        // Show latest orders first
        setorderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error);
    }
  }
    // Load order data whenever the user logs in
  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t text-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-serif'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.images[0]} alt="" />
                <div>
                  <p className='mt-2'>Product: <span className='text-gray-500'>{item.name}</span> </p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity} </p>
                    <p>Size: {item.size} </p>
                  </div>
                  <p className='mt-2'>Date of Order: <span className='text-gray-500'>{new Date(item.date).toDateString()}</span> </p>
                  <p className='mt-2'>Payment: <span className='text-gray-500'>{item.paymentMethod}</span> </p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-full cursor-pointer'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders