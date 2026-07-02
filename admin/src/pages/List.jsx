import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendURL, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  // Initialize state to store the array of products fetched from the database
  const [list, setList] = useState([]);
  // Function to fetch the entire list of products from the backend API
  const fetchList = async () => {
    try {
      const response = await axios.get(backendURL + '/api/product/list')
      console.log(response.data);

      if (response.data.success) {
        setList(response.data.products);
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }
  }
  // Function to handle product deletion, requiring the auth token in the request headers
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendURL + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        // Refresh the list immediately after a successful deletion to reflect changes
        await fetchList();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  // Automatically fetch the product list once when the component mounts
  useEffect(() => {
    fetchList()
  }, [])
  return (
    <>
      <p className='mb-2 font-serif text-2xl text-gray-700'>All Products List</p>
      <div className='flex flex-col gap-2 font-serif'>
        {/* List the product */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm '>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {
          // Dynamically iterate over the list state to render each product row
          list.map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm font-serif'>
              <img className='w-12' src={item.images?.[0]} alt={item.name || "Product"} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))}
      </div>
    </>
  )
}

export default List