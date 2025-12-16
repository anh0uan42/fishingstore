import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [{
        product: null,
        quantity: 0
    }],
    reducers: {
        setCart: (state, action) => {
            const { user } = action.payload
            const { product, quantity } = user
            state.product = { ...product },
            state.quantity = quantity
        },
        clearCart: (state, action) => {
            state.quantity = 0,
            state.product = null
        }
    }
})