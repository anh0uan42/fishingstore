import mongoose from "mongoose";
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cartItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            min: 1
        }
    }],
    profilePic: {
        type: String,
        default: ''
    },
    role: {
        type: [String],
        default: ['Customer'],
        enum: ['Customer', '1220', '1931', '2062']
    }
}, { timestamps: true })

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return
        
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        
    } catch (error) {
        throw new Error(`Something went wrong ${error}`)
    }
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User