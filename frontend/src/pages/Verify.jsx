import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
      // Get global state and helper functions from ShopContext
    const { navigate, token, setCartItems, backendURL } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId');
  // Function to verify payment with the backend
    const verifyPayment = async () => {
        try {
            if (!token) return null;
                  // Send payment status and order ID to backend for verification
            const response = await axios.post(backendURL + '/api/order/verifyStripe', { success, orderId }, { headers: { token } })
                  // If payment is verified successfully
            if(response.data.success)
            {
                setCartItems({});
                navigate('/orders')
            }
            else{
                navigate('/cart')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <div>Verify</div>
    )
}

export default Verify