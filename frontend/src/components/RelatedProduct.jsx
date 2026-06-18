import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProduct = ({category,subCategory}) => {
    //Fetch the global list of products from the ShopContext
    const {products} = useContext (ShopContext);
    // Initialize a state variable to store the filtered list of related products
    const [related ,setRelated] = useState([]);
    
    //useEffect hook runs whenever the 'products' array changes.
    // It is responsible for filtering the products to find matches.
    useEffect(()=>{
        if(products.length>0)
        {
            let productsCopy =products.slice();
            // Filter the products to only include those that match the current item's category
            productsCopy =productsCopy.filter((item) => category===item.category);
            productsCopy = productsCopy.filter((item) => subCategory===item.subCategory);
            // Update the 'related' state with our final filtered list
            setRelated(productsCopy);
            
        }
    },[products])


  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            {/* Added title */}
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                // Iterate over the 'related' array and render a ProductItem component for each one
                related.map((item,index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
                ))
            }

        </div>

    </div>
  )
}

export default RelatedProduct