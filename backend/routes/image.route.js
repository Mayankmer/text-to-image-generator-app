import express from 'express'
import { generateImage } from '../controller/image.controller.js'
import userAuth from '../middleware/auth.middleware.js'

const imageRouter = express.Router()

imageRouter.post('/generate-image', userAuth, generateImage)

export default imageRouter