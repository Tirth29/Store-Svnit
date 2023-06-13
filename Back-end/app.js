import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
config({
    path:"./data/config.env",
})
export const app = express();

// using middlewares

app.use(express.json())
app.use(cookieParser())
app.get("/", (req, res) => {
    res.send("Working")
})

app.use(
    cors({
        credentials: true,
        methods:["GET","POST","PUT","DELETE"],
        origin:[process.env.FRONTEND_URL_1,process.env.FRONTEND_URL_1]
    })
)

// importing routers here

import user from "./routes/user.js";
import product from "./routes/product.js";
import order from "./routes/order.js";

app.use("/api/v1/user",user);  
app.use("/api/v1/product",product);  
app.use("/api/v1/order",order); 

import {errorMiddlewares} from "./middleware/error.js";
import { Product } from "./models/product.js";

// using errorMidleware
app.use(errorMiddlewares);