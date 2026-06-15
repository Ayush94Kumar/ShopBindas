import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title'
import ProductItem from '../components/ProductItem';

const Collection = () => {
  // Fetch the master product list from global state (Context)
  const { products } = useContext(ShopContext);
  // State to hold the final products that will be displayed on screen
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')

  // Toggles selected categories in the state array
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      // Remove if already selected
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      // Add if newly selected
      setCategory(prev => [...prev, e.target.value])
    }
  }
// Toggles selected subcategories in the state array
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }
// Applies the selected category and subcategory filters
  const applyFilter = () => {
    // Make a shallow copy of the master list to avoid mutating original data
    let productsCopy = products.slice();
    if (category.length > 0) {
      // Keep only products whose category matches the selected ones
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      // Keep only products whose subCategory matches the selected ones
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
// Update screen with filtered products
    setFilterProducts(productsCopy)
  }
// Sorts the currently filtered products
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        // Sort ascending by price
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'high-low':
        // Sort descending by price
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;
      default:
        // Re-apply standard filter if "Relevant" is chosen
        applyFilter();
        break;
    }
  }
// Automatically re-run the filter logic whenever a user checks/unchecks a box
  useEffect(() => {
    applyFilter();
  }, [category, subCategory])
// Automatically re-sort the displayed products whenever the dropdown changes
  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-400'>
      {/* filter the product on left side */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-2xl flex items-center cursor-pointer gap-2 font-serif'>Filters
          <img className={` text-gray-600 h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Categories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 '>
            <p className='flex gap-2 font-serif'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} />Men
            </p>
            <p className='flex gap-2 font-serif'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory} />Women
            </p>
            <p className='flex gap-2 font-serif'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory} />Kids
            </p>
          </div>
        </div>
        {/* subcategories filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 '>
            <p className='flex gap-2 font-serif'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} />TopWear
            </p>
            <p className='flex gap-2 font-serif'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory} />BottomWear
            </p>
            <p className='flex gap-2 font-serif'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory} />WinterWear
            </p>
            <p className='flex gap-2 font-serif'>
              <input type="checkbox" className='w-3' value={'Formalwear'} onChange={toggleSubCategory} />Formalwear
            </p>
          </div>
        </div>
      </div>
      {/* right side list of collections */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Actual filter of products */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-400 text-sm px-2 font-serif cursor-pointer'>
            <option value="relevent">Sort by: Relavent</option>
            <option value="low-high">Price:Low-High</option>
            <option value="high-low">Price:High-Low</option>
          </select>
        </div>
        {/* Map product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>

      </div>
    </div>
  );
}

export default Collection;