import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './db/mongoDB.js'
import userRouter from './routes/user.route.js'

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors())
await connectDB()

app.use('/api/user', userRouter)
app.get('/', (req, res)=> res.send("api is working"))

app.listen(PORT, ()=>
    console.log('server running at port '+ PORT)
)