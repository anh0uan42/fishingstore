import { mongoose } from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log(`Connected to database!`)
    } catch (error) {
        console.log(`Error connecting DB: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB