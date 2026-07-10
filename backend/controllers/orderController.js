import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';
import Stripe from 'stripe'
// import {currency} from '../../admin/src/App.jsx'

//gl
const currency = 'inr'
const deliveryfee = 90

//Stripe getway intialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Order using COD method
const placeOrder = async (req, res) => {
    try {
        // Extract order details sent from the frontend
        const { userId, items, amount, address } = req.body;
        // Create a new order object
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        // Save the order in the database
        const newOrder = new orderModel(orderData);
        await newOrder.save()
        // Clear the user's cart after successful order placement
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        // Send success response

        res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//place order using  stripe method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;
        // Create a new order object
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        // Save the order in the database
        const newOrder = new orderModel(orderData);
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Fee'
                },
                unit_amount: deliveryfee * 100
            },
            quantity: 1
        })
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderID=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderID=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })
        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//verify stripe payment
const verifyStripe = async (req,res) =>{
    const {orderId,success,userId}=req.body;
    try {
        if(success==='true')
        {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}});
            res.json({success:true});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false})
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//place order using Razorpay method
const placeOrderRazorpay = async (req, res) => {

}

//all orders data for admin
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Fetch all orders of the logged-in user
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        // Find all orders belonging to the user
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//update order status from admin
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus ,verifyStripe}




