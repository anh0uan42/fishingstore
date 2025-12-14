import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    manufacture: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    feature: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        min: 0
    }
}, { timestamps: true})

const Product = mongoose.model('Product', productSchema)

export default Product