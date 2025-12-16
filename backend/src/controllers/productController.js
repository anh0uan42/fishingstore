import Product from '../db/model/Product.js'

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        console.log(`Error getting products: ${error.message}`)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, manufacture, description, price, image, category, feature, quantity } = req.body

        const product = await Product.create({
            name,
            manufacture,
            description,
            price,
            image,
            category,
            feature,
            quantity
        })

        res.status(201).json(product)
    } catch (error) {
        console.log(`Error creating product: ${error.message}`)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body.id
        const product = await Product.findById(id)

        if (!product) return res.status(404).json({ message: 'Product not found!' })

        await Product.findByIdandDelette(id)
        
        res.status(200).json({ message: 'Product delete product! '})
    } catch (error) {
        console.log(`Error deleting product: ${error.message}`)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id, name, manufacture, description, price, image, category, feature, quantity } = req.body
        const product = await Product.findById(id).exec()

        if (!product) return res.status(404).json({ message: 'Product not found!' })

        product.name = name
        product.manufacture = manufacture
        product.description = description
        product.price = price
        product.image = image
        product.category = category
        product.feature = feature
        product.quantity += quantity

        const updatedProduct = await product.save()

        res.json(updatedProduct)

    } catch (error) {
        console.log(`Error updating note: ${error.message}`)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
}

export const getProductByCategory = async (req, res) => {
    try {
        const { category } = req.params
        const products = await Product.find({ category: { $regex : category , $options: 'i' } })
        res.json(products)
    } catch (error) {
        console.log(`Error getting products: ${error.message}`)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
}

export const getProductByName = async (req, res) => {
    try {

        const { product } = req.params
        console.log(product)
        const foundProduct = await Product.findOne({ name: product , $options: 'i' }).exec()
        res.json("nana")
    } catch (error) {
        console.log(`Error getting products: ${error.message}`)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
}