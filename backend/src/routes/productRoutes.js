import express from 'express'
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductByCategory, getProductByName } from '../controllers/productController.js'


const productRouter = express.Router()

productRouter.get('/', getAllProducts)
productRouter.get('/products/:product', getProductByName)
productRouter.get('/:category', getProductByCategory)
productRouter.post('/', createProduct)
productRouter.delete('/', deleteProduct)
productRouter.patch('/', updateProduct)

export default productRouter