import React, { useEffect } from 'react'
import { useGetProductByNameQuery, } from '../features/apiSlice/productApiSlice'
import { useParams } from 'react-router'

function ProductPage() {

  const products = useParams()
  console.log(products)
  const name = products.products
  console.log(name)

  const {data: product,isSuccess, isLoading} = useGetProductByNameQuery(name)

  let content

  if (isLoading) content = <p>Loading....</p>
  if (isSuccess) content = (
    <>
      <p>{product.name}</p>
      <p>{product.feature}</p>
    </>
  )
  console.log(product)

  return (
    <div>
      {content}
    </div>
  )
}

export default ProductPage
