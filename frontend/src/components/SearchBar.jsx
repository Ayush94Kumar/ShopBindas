import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearchInput = (e) => {
        setSearch(e.target.value);
        // If the user types something and isn't on the collection page, redirect them
        if (location.pathname !== '/collection') {
            navigate('/collection');
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (location.pathname !== '/collection') {
            navigate('/collection');
        }
    };

    return (
 <>
            {/* Desktop View: inline navbar design */}
            <div className='hidden sm:flex items-center border border-gray-600 rounded-full overflow-hidden'>
                <form onSubmit={handleSearchSubmit} className='flex items-center'>
                    <input 
                        type="text" 
                        value={search}
                        onChange={handleSearchInput}
                        placeholder="Search products..." 
                        className='px-4 py-1.5 w-48 md:w-64 lg:w-80 outline-none text-sm font-serif'
                    />
                    <button type="submit" className='px-4 py-2 bg-gray-200 border-l border-gray-500 hover:bg-gray-300 transition-colors cursor-pointer'>
                        <img src={assets.search_icon} className='w-4 opacity-70' alt="search" />
                    </button>
                </form>
            </div>

            {/* Mobile View: Shows an input field overlay when the mobile search icon is clicked */}
            {showSearch && (
                <div className='sm:hidden absolute top-20 left-0 w-full bg-gray-50 z-50 border-b border-gray-300 px-5 py-4 shadow-sm flex justify-center items-center'>
                    <div className='flex items-center border border-gray-400 rounded-full w-full px-4 py-2 bg-white'>
                        <input 
                            type="text" 
                            value={search}
                            onChange={handleSearchInput}
                            placeholder="Search products..." 
                            className='flex-1 outline-none text-sm font-serif'
                            autoFocus
                        />
                        <img src={assets.search_icon} className='w-4 opacity-70' alt="search" />
                    </div>
                    <img 
                        onClick={() => setShowSearch(false)} 
                        src={assets.cross_icon} 
                        className='w-5 ml-4 cursor-pointer opacity-70' 
                        alt="close" 
                    />
                </div>
            )}
        </>
    );
};

export default SearchBar;