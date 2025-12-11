import express from 'express'
import 'dotenv/config'
import connectDB from './db/db.js'

const app = express()
const PORT = process.env.PORT || 3500

app.get('/api/', (req, res) => {
    res.json({ message: 'Reached root!!'})
})



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`App is listening on Port ${PORT}`)
    })
})