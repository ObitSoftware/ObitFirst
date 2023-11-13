import express from "express"
const productsRoutes = express.Router()
import {getAllProducts, getProductData, saveNewProduct } from "../controllers/products.controllers.js"

productsRoutes.get("/getAllProducts", getAllProducts)
productsRoutes.post("/saveNewProduct", saveNewProduct)
productsRoutes.get("/getProductData/:productId", getProductData)

export default productsRoutes;