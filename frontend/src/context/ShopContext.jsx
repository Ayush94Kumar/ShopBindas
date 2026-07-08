import { createContext, useEffect, useState } from "react"
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

// Create a Context for the Shop to allow global state sharing across components
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    // Define constant shop configuration variables
    const currency = '₹';
    const delivery_fee = 90;
    const backendURL = import.meta.env.VITE_BACKEND_URL

    // Initialize state variables for UI, cart, products, and authentication
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');

    const navigate = useNavigate();

    // Function to add a specific size of an item to the cart
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select the Size')
            return;
        }

        // Clone the cart state to avoid mutating it directly
        let cartData = structuredClone(cartItems);

        // Logic to increment quantity if item/size exists, or initialize it if it doesn't
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        // If the user is logged in (token exists), sync the addition with the backend API
        if (token) {
            try {
                await axios.post(backendURL + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    // Function to calculate the total number of items currently in the cart
    const getCartCount = () => {
        let totalCount = 0;
        // Iterate through all items and their sizes in the cart object
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    // Function to update the exact quantity of a specific item size in the cart
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        // Sync the quantity update with the backend if the user is authenticated
        if (token) {
            try {
                await axios.post(backendURL + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    // Function to calculate the total monetary cost of all items in the cart
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const p_id in cartItems) {
            // Find the full product details to get the price
            let itemInfo = products.find((product) => product._id === p_id)
            for (const size in cartItems[p_id]) {
                try {
                    // Multiply item price by its quantity and add to total
                    if (cartItems[p_id][size] > 0 && itemInfo) {
                        totalAmount += itemInfo.price * cartItems[p_id][size];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalAmount;
    }

    // Function to fetch the entire list of products from the backend API
    const getProductsData = async () => {
        try {
            const response = await axios.get(backendURL + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    // Function to fetch the authenticated user's saved cart from the backend API
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendURL + '/api/cart/get', {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    // Effect hook to fetch product data immediately when the application loads
    useEffect(() => {
        getProductsData()
    }, [])

    // Effect hook to check for an existing session token in localStorage to persist user login
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, [])

    // Bundle all state variables and functions into a single context object
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate, backendURL, setToken, token
    }

    // Return the Provider component, wrapping all child components so they can access the context
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider
