import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios'
import { backendURL, currency } from '../App';
import { toast } from 'react-toastify'
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  // Stores all orders fetched from the backend
  const [orders, setOrders] = useState([]);
  // Fetch all orders from the backend
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendURL + '/api/order/list', {}, { headers: { token } });
      console.log(response.data);

      if (response.data.success) {
        setOrders(response.data.orders);
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error)
    }
  }
  // Update the status of a selected order
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendURL + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } });
      // Refresh the order list after successful status update
      if (response.data.success) {
        await fetchAllOrders()
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  // Fetch orders when the component mounts or token changes
  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 font-serif">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Orders Page</h1>
      <div className="flex flex-col gap-4">
        {
          orders.map((order, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-gray-200 rounded-lg p-4 md:p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <img src={assets.parcel_icon} alt="Parcel Icon" className="w-12 h-12 object-contain" />

              <div className="flex-1">
                <div className="mb-2">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return <p key={index} className="inline font-medium text-gray-800"> {item.name} x {item.quantity} <span className="text-gray-500"> {item.size} </span> </p>
                    }
                    else {
                      return <p key={index} className="inline font-medium text-gray-800"> {item.name} x {item.quantity} <span className="text-gray-500"> {item.size} </span> , </p>
                    }
                  })}
                </div>

                <p className="mt-3 mb-1 font-semibold text-gray-700"> {order.address.firstName + " " + order.address.lastName} </p>

                <div className="text-sm text-gray-600">
                  <p>{order.address.street + ","}</p>
                  <p> {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode} </p>
                </div>

                <p className="text-sm text-gray-600 mt-1">{order.address.phone}</p>
              </div>

              <div className="text-sm text-gray-600 flex flex-col gap-1">
                <p>Items : <span className="font-medium text-gray-800">{order.items.length}</span></p>
                <p>Method : <span className="font-medium text-gray-800">{order.paymentMethod}</span></p>
                <p>Payment : <span className={order.payment ? "text-green-600 font-semibold" : "text-amber-600 font-semibold"}>{order.payment ? 'Done' : 'Pending'}</span></p>
                <p>Date : <span className="font-medium text-gray-800">{new Date(order.date).toLocaleDateString()}</span></p>
              </div>

              <p className="text-lg font-bold text-gray-900"> {currency}{order.amount} </p>

              <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="p-2 border border-gray-300 rounded bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders