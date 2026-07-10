import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const { navigate, token, setCartItems, backendURL } = useContext(ShopContext);
    const [searchParams] = useSearchParams();

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token) return null;
            
            // Send request to verify. Note: If backend verifyStripe needs userId, 
            // you might need to decode it from token on backend rather than passing it here.
            const response = await axios.post(backendURL + '/api/order/verifyStripe', 
                { success, orderId }, 
                { headers: { token } }
            );

            if (response.data.success) {
                setCartItems({});
                navigate('/orders')
            } else {
                navigate('/cart')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if(token){
           verifyPayment();
        }
    }, [token])

    return (
        <div>Verifying your payment...</div>
    )
}

export default Verify