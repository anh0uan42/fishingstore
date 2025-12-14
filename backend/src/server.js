import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import connectDB from './db/db.js'
import corsOptions from './config/corsOptions.js'

import productRouter from './routes/productRoutes.js'
import authRouter from './routes/authRoutes.js'

const app = express()
const PORT = process.env.PORT || 3500

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.use('/api/products', productRouter)
app.use('/api/auth', authRouter)



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`App is listening on Port ${PORT}`)
    })
})