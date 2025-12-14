import { useState } from 'react'
import { useAddProductMutation } from '../features/apiSlice/productApiSlice'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { PlusCircle, Loader } from 'lucide-react'

const categories = ['Rods', 'Reels', 'Apparel', 'Lures', 'Others']

function CreateProductForm() {
    const [newProduct, setNewProduct] = useState({
        name: '',
        manufacture: '',
        description: '',
        price: '',
        image: '',
        category: '',
        feature: '',
        quantity: ''
    })

    const [addProduct, { isLoading }] = useAddProductMutation()

    const canSave = [newProduct.name, newProduct.manufacture, newProduct.description, newProduct.price, newProduct.image, newProduct.category, newProduct.feature,
        newProduct.category].every(Boolean) && !isLoading

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (!canSave){
                toast.error('All fields are required!')
                return
            }
            await addProduct(newProduct)
            toast.success('Product Added!')
            setNewProduct({
                name: '',
                manufacture: '',
                description: '',
                price: '',
                image: '',
                category: '',
                feature: '',
                quantity: ''
            })
        } catch (error) {
            console.log('Error creating product')
            toast.error('Error creating product')
        }
    }

  return (
    <motion.div
        className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
    >
        <h2 className='text-2xl font-semibold mb-6 text-emerald-300'>Create New Product</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-300'>Product Name</label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-sm shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2'
                    required
                />
            </div>
            <div>
                <label htmlFor='manufacture' className='block text-sm font-medium text-gray-300'>Product Manufacture</label>
                <input
                    type='text'
                    id='manufacture'
                    name='manufacture'
                    value={newProduct.manufacture}
                    onChange={(e) => setNewProduct({ ...newProduct, manufacture: e.target.value })}
                    className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-sm shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2'
                    required
                />
            </div>
            <div>
                <label htmlFor='description' className='block text-sm font-medium text-gray-300'>Product Description</label>
                <textarea
                    type='text'
                    id='description'
                    name='description'
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-sm shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                    required
                />
            </div>
            <div>
                <label htmlFor='price' className='block text-sm font-medium text-gray-300'>Product Price</label>
                <input
                    type='number'
                    id='price'
                    name='price'
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-sm shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2'
                    required
                />
            </div>
            <div>
                <label htmlFor='image' className='block text-sm font-medium text-gray-300'>Product Image Url</label>
                <input
                    type='text'
                    id='image'
                    name='image'
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-sm shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2'
                    required
                />
            </div>
            <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-300'>Category</label>
                <select
						id='category'
						name='category'
						value={newProduct.category}
						onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
						 shadow-sm py-2 px-3 text-white focus:outline-none 
						 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
						required
					>
						<option value=''>Select a category</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
            </div>
            <div>
                <label htmlFor='feature' className='block text-sm font-medium text-gray-300'>Product Features</label>
                <textarea
                    type='text'
                    id='feature'
                    name='feature'
                    value={newProduct.feature}
                    onChange={(e) => setNewProduct({ ...newProduct, feature: e.target.value })}
                    className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-sm shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                    required
                />
            </div>
            <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-300'>Product Quantity</label>
                <input
                    type='number'
                    id='quantity'
                    name='quantity'
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                    className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-sm shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2'
                    required
                />
            </div>
            <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                        Loading...
                    </>
                ) : (
                    <>
                        <PlusCircle  className='mr-2 h-5 w-5'/>
                        Create Product
                    </>
                )}
            </button>
        </form>
    </motion.div>
  )
}

export default CreateProductForm
