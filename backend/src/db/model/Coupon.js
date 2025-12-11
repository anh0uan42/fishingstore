import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    minPurchaseAmount: {
        type: Number,
        required: true
    },
    upperPurchaseAmount: {
        type: Number,
    },
    amount: Number,
    percent: Number,
    isActive: {
        type: Boolean,
        default: true,
    },
    expire: {
        type: Date,
        required: true
    },
    usage: {
        type: Number,
        default: 0
    }
})

const Coupon = mongoose.model('Coupon', couponSchema)
export default Coupon