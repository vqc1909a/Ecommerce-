import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";


// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    // res.status(401);
    // throw new Error("NOT AUTHORIZED");
    return res.status(200).json(products);
});

// @desc Fetch single products
// @route GET /api/products/:slug
// @access Public
const getProductBySlug = asyncHandler(async(req, res) => {
    // try{
        const {slug} = req.params;
        const product = await Product.findOne({slug});
        if(!product){
            res.status(404);
            throw new Error("Producto no encontrado");
        }
        return res.status(200).json(product);
    // }catch(err){
    //     console.log(err.statusCode, err.message)
        //! Lo que me bota para el producto no encontrado
//         200
// [0] undefined Producto no encontrado
//!Lo que me bota po error de librería de terceros
// 200
// [0] undefined Cast to ObjectId failed for value "624cdadad3e065d737e8d32z" (type string) at path "_id" for model "Product"
//!Lo que me bota por error interno del servidor
// 200
// [0] undefined Product.fin is not a function

//!A hora entinedo porque midu ponia el err.status || 500

        // next(err)
    // }
});

export {getProducts, getProductBySlug}