import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import * as HELPERS from "../utils/helpers/index.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async(req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user || !user.verifyPassword(password)){
        res.status(401);
        throw new Error("Usuario o Password Incorrecto")
    }
    const token = HELPERS.generateToken({id: user._id});
    return res.status(200).json({message: token})
})

// @desc Registe a new user
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    const user = await User.findOne({email});

    if(user){
        res.status(400);
        throw new Error("El usuario ya existe");
    }
    const savedUser = await User.create({
        name,
        email,
        password
    })
    const token = HELPERS.generateToken({id: savedUser._id});

    return res.status(200).json({
        message: token
    })
})

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    return res.status(200).json(req.user);
})



export {loginUser, registerUser, getUserProfile}