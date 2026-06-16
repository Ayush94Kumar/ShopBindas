import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch } = useContext(ShopContext);
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
    );
};

export default SearchBar;