import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "./Reducers/UserReducer";
import {otherReducer} from "./Reducers/otherReducer";
import { productReducer } from "./Reducers/productReducer";
import { cartReducer } from "./Reducers/CartReducers";
export const Store = configureStore({
    
    reducer:{
        user : userReducer,
        other: otherReducer,
        product: productReducer,
        cart : cartReducer
    },
});

export const server = "https://e-commerce-server-a619.up.railway.app/api/v1"