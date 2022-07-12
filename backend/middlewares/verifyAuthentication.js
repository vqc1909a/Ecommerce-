import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export default asyncHandler(async(req, res, next) => {
    const authorization = req.get("authorization");
    let token = ""
    if(authorization && authorization.toLowerCase().startsWith("bearer")){
        token = authorization.split(" ")[1];
    }
    if(!token) {
        res.status(401);
        throw new Error("Accesso Denegado");
    }
    //!Token decodificado con la palabra secreta
    try{
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        if(!user){
            res.status(401);
            throw new Error("Acceso Denegado");
        }
        req.user = user;
        return next();
    }catch(err){
        console.log(err);
        res.status(401);
        throw new Error("Token missing or invalid")
    }
})