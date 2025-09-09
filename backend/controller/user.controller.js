import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const registerUser = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({
                sucess: false, message: "missing details"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creating new user with hashed password
        const userData = {
            name,
            email, 
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({sucess: true, token, user:{
            name: user.name
        }})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

