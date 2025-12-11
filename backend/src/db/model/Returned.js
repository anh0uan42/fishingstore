import mongoose from "mongoose";

const returnedSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    reasons: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Returned'],
        required: true
    }
}, { timestamps: true })

const Returned = mongoose.model('Returned', returnedSchema)

export default Returned