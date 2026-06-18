import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  const { productId } = useParams();

  // Fetches the master list of all products and the currency symbol
  const { products, currency } = useContext(ShopContext);
  // LOCAL COMPONENT STATE:
  // productData: Stores all the details of the single product we want to show.
  const [productData, setProductData] = useState(false);
  // image: Stores the currently selected image URL to show in the big main picture box.
  const [image, setImage] = useState('')
  // size: Remembers which clothing/shoe size the user clicked on.
  const [size, setSize] = useState('')

  // DATA FETCHING LOGIC:
  // Loops through all products to find the one that matches the ID from the URL.
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  // Runs the fetchProductData function automatically whenever the component loads,
  // or whenever the productId in the URL changes.
  useEffect(() => {
    fetchProductData();
  }, [productId])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row' >

        {/* image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

          {/* Fix: Moved the closing </div> tag to wrap the mapped images */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img 
                  onClick={() => setImage(item)} /* Fix: Added onClick to make thumbnails work */
                  src={item} 
                  key={index} 
                  alt="" 
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' 
                />
              ))
            }
          </div>

          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
        {/* product information */}
        <div className='flex-1 '>
            <h1 className='font-serif text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className='w-3 5'/>
              <img src={assets.star_icon} alt="" className='w-3 5'/>
              <img src={assets.star_icon} alt="" className='w-3 5'/>
              <img src={assets.star_icon} alt="" className='w-3 5'/>
              <img src={assets.star_dull_icon} alt="" className='w-3 5'/>
              <p className='pl-2'>(220)</p>
            </div>
            <p className='mt-5 text-3xl font-mono'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-600 md:w-4/5 font-serif'>{productData.description}</p>
            {/* Select Size */}
            <div className='flex flex-col gap-4 my-8'>
              <p className='font-serif text-gray-950 text-2xl'>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item,index)=>(
                  <button onClick={() =>{setSize(item)}} className={`border py-2 px-4 bg-gray-100 ${item===size ? 'border-amber-600':'bg-gray-200'} cursor-pointer`} key={index}>{item}</button>
                ))}
              </div>
            </div>
            <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 font-serif cursor-pointer'>ADD TO CART</button>

            {/* more information about product */}
            <hr className='mt-8 sm:w-4/5'/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p className='font-serif text-gray-600'>100% Original Product made by ShopBindash.</p>
              <p className='font-serif text-gray-600'>Cash on Delivery is available on this product.</p>
              <p className='font-serif text-gray-600'>Return and excahnge within 7 days provided by ShopBindas.</p>
            </div>
        </div>
      </div>
      {/* related product */}
       <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product