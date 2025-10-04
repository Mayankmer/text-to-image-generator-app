import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import razorpay from 'razorpay'
import transactionModel from "../models/transaction.model.js";
const registerUser = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({
                success: false, message: "missing details"
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

        res.json({success: true, token, user:{
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
            return res.json({success:false, message:
                'user does not exist'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            //generate token
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

            res.json({success: true, token, user:{
                name: user.name
            }})
        }else{
            return res.json({success: false, 
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

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
    console.log('paymentRazorpay function called');
    try {
        console.log('Entered try block');
        const userId = req.userId;
        const { planId } = req.body;

        if (!userId || !planId) {
            return res.status(400).json({ // Use a 400 Bad Request status code
                success: false,
                message: "Missing user or plan details"
            });
        }

        let credits, plan, amount;

        switch (planId) {
            case 'Basic':
                plan = 'Basic';
                credits = 100;
                amount = 10;
                break;
            case 'Advanced':
                plan = 'Advanced';
                credits = 500;
                amount = 50;
                break;
            case 'Business':
                plan = 'Business';
                credits = 5000;
                amount = 250;
                break;
            default:
                return res.status(404).json({ success: false, message: 'Plan not found' }); 
        }

        const transactionData = {
            userId,
            plan,
            amount,
            credits,
            date: new Date() 
        };

        const newTransaction = await transactionModel.create(transactionData);

        const options = {
            amount: amount * 100, 
            currency: process.env.CURRENCY,
            receipt: newTransaction._id.toString()
        };

        console.log("Creating Razorpay order with options:", options);
        
        const order = await razorpayInstance.orders.create(options);

        console.log("Razorpay order created:", order.id);
        return res.status(200).json({ success: true, order });

    } catch (error) {
        console.error("Error in Razorpay payment processing:", error);
        
        
        res.status(500).json({
            success: false,
            message: "An internal server error occurred."
        });
    }
}

const verifyPayment = async (req, res)=>{
    try {
        const {razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo === 'paid'){
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            // if(transactionData.payment){
            //     return res.json({
            //         success: 'false',
            //         message: 'Payment Failed'
            //     })
            // }
            const userData = await userModel.findById(transactionData.userId)

            const creditBalance = userData.creditBalance + transactionData.credits

            //updating the credit balance
            await userModel.findByIdAndUpdate(userData._id, {creditBalance})

            await transactionModel.findByIdAndUpdate(transactionData._id, {payment: true})
            
            res.json({
                success: true,
                message: 'Credits Added'
            })
        }else{
            res.json({
                success: false,
                message: 'Payment Failed'
            })
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}
export {
    registerUser,
    loginUser,
    userCredits,
    paymentRazorpay,
    verifyPayment
    }