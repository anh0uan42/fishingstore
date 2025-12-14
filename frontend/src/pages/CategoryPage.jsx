import { motion } from "framer-motion"
import { useGetProductsByCategoryQuery, useGetProductsQuery } from "../features/slices/productApiSlice"
import ProductCard from "../components/ProductCard"
import { Link, useParams } from "react-router"


function CategoryPage() {

    const param = useParams()
    const title = param.category
    const {data: products , isLoading, isError, isSuccess, error} = useGetProductsByCategoryQuery(title)
    console.log(param)


    // useEffect(() => {
    //     const data = getProductsByCategory()
    // }, [getProductsByCategory])
    // let content

    // if (isLoading) content = (<p>Loading</p>)
    // if (isError) {
    //     content = (<p>Error</p>)
    //     console.log(error)
    // }

    if (isSuccess) {
        console.log(products)
    }
    

  return (
        <div className="min-h-screen">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.h1
                    className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.7, delay: 0.3}}
                    >
                    {title[0].toUpperCase()}{title.slice(1)}
                </motion.h1>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center"
                    initial={{opacity: 0, y:20}}
                    animate={{opacity: 1, y:0}}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    >
                    {isLoading && (
                        <>
                            <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full"> Loading...</h2>
                        </>
                    )}
                    {isError && (
                        <>
                            <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full"> Error</h2>
                        </>
                    )}
                    {isSuccess && products.ids.map((productId) => 
                    
                        <ProductCard key={productId} productId={productId} product={products.entities[productId]} />
                    
                    )}
                </motion.div>
            </div>
        </div>
  )
}

export default CategoryPage
