const express = require('express')
const productController = require('../controllers/productController')
const router = express.Router()

//defaults router /user
//router get read product, read detail product
router.get("/products", productController.readAllProduct)
router.get("/products/:id", productController.readDetailProduct)
router.post("/products", productController.addProduct)
router.put("/products/:id", productController.editProduct)
router.delete("/products/:id", productController.deleteProduct)



module.exports = router

