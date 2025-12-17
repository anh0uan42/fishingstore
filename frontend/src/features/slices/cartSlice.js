import { createSelector, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        totalQuantity: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const { newItem, quantity } = action.payload

            const existedItem = state.cartItems.find((item) => item._id === newItem._id)

            if (existedItem) {
                existedItem.quantity++
            } else {
                state.cartItems.push({ ...newItem, quantity: quantity })
            }
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const existedItem = state.cartItems.find((item) => item._id === id)
            if (existedItem) {
                existedItem.quantity += quantity

                if (existedItem.quantity <= 0 ){
                    existedItem.cartItems = state.cartItems.filter((i) => i._id !== id)
                }
            }
        },

        updateAmountQuantity: (state, action) => {
            const { id, newQuantity } = action.payload
            const existedItem = state.cartItems.find((item) => item._id === id)
            if (existedItem) {
                existedItem.quantity = newQuantity

                if (existedItem.quantity <= 0 ){
                    state.cartItems = state.cartItems.filter((i) => i._id !== id)
                }
            }
        },

        removeItem: (state, action) => {
            const { id } = action.payload
            state.cartItems = state.cartItems.filter(item => item._id !== id)
        },

        // getTotal: (state) => {
        //     let { total, itemQuantity } = state.cartItems.reduce((cartTotal, cartItem) => {
        //         const { price, quantity } = cartItem
        //         const itemTotal = price * quantity

        //         cartTotal.total += itemTotal
        //         cartTotal.quantity  += quantity
        //         return cartTotal
        //     }, {
        //         total: 0,
        //         itemQuantity: 0
        //     })
        //     state.totalAmount = total,
        //     state.totalQuantity = itemQuantity
        // }
    }
})

export const { addToCart, updateQuantity, removeItem, updateAmountQuantity } = cartSlice.actions
export default cartSlice.reducer
export const selectCurrentCart = (state) => state.cart

// const initialState = {
//     cartItems: [],
//     totalQuantity:0,
//     totalAmount:0,
// }


// const cartSlice = createSlice({
//     name:'cart',
//     initialState,
//     reducers : 
//         {
//             addToCart(state,action) {
//             const cartItemIndex = state.cartItems.findIndex(
//                 (item) => item.id === action.payload.id);

//             if(cartItemIndex >= 0) {
//                 state.cartItems[cartItemIndex].cartQuantity += 1;
//             }

//             else {
//                 const tempProduct = {...action.payload, cartQuantity:1};
//                 state.cartItems.push(tempProduct);
//                 toast.success(`${action.payload.name} is added to the cart!`,
//                 {position:'top-right'})
//             }
            
//         },

//         removeItem(state,action) {
//           const inCartItems =  state.cartItems.filter(
//                 cartItem => cartItem.id!==action.payload.id
//             );
//             state.cartItems=inCartItems;
//         },

//         decreaseCartQuantity(state,action ) {
//                 const itemIndex= state.cartItems.findIndex(
//                     cartItem => cartItem.id === action.payload.id
//                 )
                
//                 if(state.cartItems[itemIndex].cartQuantity > 1) {
//                     state.cartItems[itemIndex].cartQuantity-= 1;
//                 }

//                 else if(state.cartItems[itemIndex].cartQuantity === 1) {
//                     const inCartItems =  state.cartItems.filter(
//                         cartItem => cartItem.id!==action.payload.id
//                     );
//                     state.cartItems=inCartItems;
//                 }
//         },

//         increaseCartQuantity(state,action) {
//             const itemIndex= state.cartItems.findIndex(
//                 cartItem => cartItem.id === action.payload.id
//             )
//                 state.cartItems[itemIndex].cartQuantity+= 1;         
//         },
//         updateAmountQuantity: (state, action) => {
//             const { id, newQuantity } = action.payload
//             const existedItem = state.cartItems.find((item) => item._id === id)
//             if (existedItem) {
//                 existedItem.quantity = newQuantity

//                 if (existedItem.quantity <= 0 ){
//                     state.cartItems = state.cartItems.filter((i) => i._id !== id)
//                 }
//             }
//         },

//         clearAllCart(state) {
//             state.cartItems = [];  

//         },

//         getTotal(state) {
//             let {total,quantity} = state.cartItems.reduce((cartTotal, cartItem)=>{
//                 const {price,cartQuantity} = cartItem;
//                 const itemTotal = price * cartQuantity;

//                 cartTotal.total += itemTotal;
//                 cartTotal.quantity += cartQuantity

//                 return cartTotal;
//             }, {
//                 total:0,
//                 quantity:0,
//             });

//             state.totalQuantity = quantity;
//             state.totalAmount = total;
//         }

//     }
// })

// export const {addToCart,
//     removeItem,
//     decreaseCartQuantity,
//     increaseCartQuantity,
//     clearAllCart,
//     updateAmountQuantity,
//     getTotal} = cartSlice.actions;

// export default cartSlice.reducer;

// export const selectCurrentCart = (state) => state.cart