import React, { useEffect } from 'react'
import { useGetProductByNameQuery, selectAllProducts, useGetProductsByCategoryQuery, selectProductById } from '../features/apiSlice/productApiSlice'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

function ProductPage() {

    const products = useParams()
    const name = products.products
    console.log(name)
    const {data, isLoading, isSuccess, isError} = useGetProductByNameQuery(name)
    if (isSuccess) console.log(data)

  return (
    <div>
      product page
    </div>
  )
}

export default ProductPage
