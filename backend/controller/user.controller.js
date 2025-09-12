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

const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({sucess:false, message:
                'user does not exist'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            //generate token
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

            res.json({sucess: true, token, user:{
                name: user.name
            }})
        }else{
            return res.json({sucess: false, 
                message:'Invalid credentials'
            })
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const userCredits = async (req, res)=>{
    try {
        const userId = req.userId
        const user = await userModel.findById(userId).select("-password")

        if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
        }
        res.status(200).
        json({
            success: true,
            credits: user.creditBalance,
            user: {name: user.name}
        })
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
export {
    registerUser,
    loginUser,
    userCredits,
    }