import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    // master list of all products from the global ShopContext
    const { products } = useContext(ShopContext);
    // Create a local state variable to store only the best-selling products
    // It starts as an empty array []
    const [bestSeller, setBestSeller] = useState([]);
    // 3. Use useEffect to filter the products when the component loads
    useEffect(() => {
        // Look through ALL products and only keep the ones where 'bestseller' is true
        const bestProduct = products.filter((item) => (item.bestseller));
        // Take only the first 10 items from that filtered list and save them to our state
        setBestSeller(bestProduct.slice(0, 10));
        //The empty array [] means this filtering logic only runs once when the component first appears.
    }, [])
    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLER'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700'>
                    Explore the top-rated products that customers can't stop buying. From trending fashion to everyday essentials, these best sellers are handpicked just for you.
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    // using map to access the product
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller