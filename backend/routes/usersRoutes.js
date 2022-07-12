import express from "express";
import { loginUser, registerUser, getUserProfile} from "../controllers/usersController.js";
import verifyAuthentication from "../middlewares/verifyAuthentication.js";

const Router = express();

Router.route("/").post(registerUser); 
Router.route("/login").post(loginUser);
Router.route("/profile").get(verifyAuthentication, getUserProfile);


export default Router;
