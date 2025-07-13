import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/user'
import cartReducer from './features/cart/cartSlice'
import productsReducer from './features/products/productSlice'
export  const store = configureStore({
    reducer :{
        user : userReducer,
        products: productsReducer,
        cart: cartReducer
    }
})

