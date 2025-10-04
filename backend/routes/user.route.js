import express from 'express'
import {registerUser, loginUser, userCredits, paymentRazorpay, verifyPayment} from '../controller/user.controller.js'
import userAuth from '../middleware/auth.middleware.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits',userAuth, userCredits)
userRouter.post('/payment',userAuth, paymentRazorpay)
userRouter.post('/verify-payment', verifyPayment)

export default userRouter