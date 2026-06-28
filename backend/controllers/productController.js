import { v2 as cloudinary } from 'cloudinary'
import { json } from 'express';
import productModel from '../models/productModel.js'

//function for add product
const addProduct = async (req, res) => {
    try {
        //taking the product details from req body
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        //taking image from files 
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        //upload on cloudinary
        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        // save data in database
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            images: imageUrl,
            date: Date.now()
        }
        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "product added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//function for list product
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


//function for remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Delete"})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// const single product information

const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body
        const product= await productModel.findById(productId);
        res.json({success:true,product})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export { addProduct, listProduct, removeProduct, singleProduct }