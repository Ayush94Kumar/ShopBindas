import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendURL } from '../App';
import { toast } from 'react-toastify';

// The component accepts 'token' as a prop, which is used for authenticating the API request
const Add = ({token}) => {
// Storing the selected image files.
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
// Storing standard text and boolean inputs for the product details
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  // Storing selected sizes as an array (e.g., ["S", "M", "XL"])
  const [sizes, setSizes] = useState([]);

// This function runs when the user clicks the "ADD" button
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // PREPARING DATA FOR API
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      // Arrays/Objects must be converted to JSON strings before appending to FormData
      formData.append("sizes", JSON.stringify(sizes));
      // Only append the image to the form data if the user actually selected one
      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      //MAKING THE API CALL
      // Sending a POST request to the backend. We pass 'token' in the headers for authentication.
      const response =await axios.post(backendURL + "/api/product/add", formData,{headers:{token}})
      if(response.data.success)
      {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 font-serif'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt='' />
            <input onChange={(e) => setImage1(e.target.files[0])} type='file' id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt='' />
            <input onChange={(e) => setImage2(e.target.files[0])} type='file' id="image2" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt='' />
            <input onChange={(e) => setImage3(e.target.files[0])} type='file' id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt='' />
            <input onChange={(e) => setImage4(e.target.files[0])} type='file' id="image4" hidden />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Product Name' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Product description' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2' >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product SubCategory</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2' >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">BottomWear</option>
            <option value="Winter">Winter</option>
            <option value="Formalwear">FormalWear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='₹ 950' />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        {/*  DYNAMIC ARRAY TOGGLING (SIZES) */}
        <div className='flex gap-3'>
          <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
            <p className={` ${sizes.includes("S") ? "bg-gray-400" : "bg-gray-300"} px-3 py-1 cursor-pointer`} >S</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
            <p className={` ${sizes.includes("M") ? "bg-gray-400" : "bg-gray-300"} px-3 py-1 cursor-pointer`} >M</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
            <p className={` ${sizes.includes("L") ? "bg-gray-400" : "bg-gray-300"} px-3 py-1 cursor-pointer`} >L</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
            <p className={` ${sizes.includes("XL") ? "bg-gray-400" : "bg-gray-300"} px-3 py-1 cursor-pointer`} >XL</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
            <p className={` ${sizes.includes("XXL") ? "bg-gray-400" : "bg-gray-300"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        {/* Toggles boolean state between true and false */}
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">BestSeller</label>
      </div>
      <button className='w-28 py-3 mt-4 bg-black text-white cursor-pointer' type='submit'>ADD</button>
    </form>
  )
}

export default Add