import express from "express";
import { getProductBySlug, getProducts } from "../controllers/productsController.js";
const Router = express();

// Router.get("/", getProducts);
Router.route("/").get(getProducts);

// Router.get("/:slug", getProductBySlug);
Router.route("/:slug").get(getProductBySlug);

export default Router