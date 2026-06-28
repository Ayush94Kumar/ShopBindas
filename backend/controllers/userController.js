import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express, { json } from 'express'
import userModel from '../models/userModel.js'

//created jwt token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email });
        //if user does not exist
        if (!user) {
            return res.json({ success: false, message: "user not exist!!" })
        }
        //matching the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'Invalid password' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}

// user registretion
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //user allreadyy exist
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exsits" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter Strong password" })
        }
        //bcrypt the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

//Admin login
const adminLogin = async (req, res) => {
    try {
        //getting email and password from body
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            //Genrating the token
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, message: "invalid credantials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export { loginUser, registerUser, adminLogin }