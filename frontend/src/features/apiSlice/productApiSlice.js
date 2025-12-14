import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


const productsAdapter =  createEntityAdapter({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
})

const initialState = productsAdapter.getInitialState()

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => ({
                url: '/products',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedProducts = responseData.map(product => {
                    product.id = product._id
                    return product
                })
                return productsAdapter.setAll(initialState, loadedProducts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Product', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Product', id}))
                    ]
                } else return [{ type: 'Product', id: 'LIST'}]
            }
        }),
        
        getProductsByCategory: builder.query({
            query: (category) => ({
                url: `/products/${category}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedProductsByCatgory = responseData.map(product => {
                    product.id = product._id
                    return product
                })
                return productsAdapter.setAll(initialState, loadedProductsByCatgory)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Product', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Product', id}))
                    ]
                } else return [{ type: 'Product', id: 'LIST'}]
            }
        }),

        addProduct: builder.mutation({
            query: initialProduct => ({
                url: '/products',
                method: 'POST',
                body: {
                    ...initialProduct
                }
            }),
            invalidatesTags: [{ type: 'Product', id: 'LIST'}]
        }),

        updateProduct: builder.mutation({
            query: initialProduct => ({
                url: '/products',
                method: 'PATCH',
                body: {
                    ...initialProduct
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: 'LIST' }
            ]
        }),

        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: '/products',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id}
            ]
        })
    })
})

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useGetProductsByCategoryQuery
} = productsApiSlice

export const selectProductsResult = productsApiSlice.endpoints.getProductsByCategory.select()

const selectProductData = createSelector(
    selectProductsResult,
    productsResult => productsResult.data
)

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds,

} = productsAdapter.getSelectors(state => selectProductData(state) ?? initialState)