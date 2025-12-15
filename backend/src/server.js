import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import connectDB from './db/db.js'
import corsOptions from './config/corsOptions.js'

import productRouter from './routes/productRoutes.js'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'

const app = express()
const PORT = process.env.PORT || 3500

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Your actual frontend URL
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(cors(corsOptions))

app.use('/api/products', productRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`App is listening on Port ${PORT}`)
    })
})