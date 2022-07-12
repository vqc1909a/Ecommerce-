import productsReducer from "./products";
import cartReducer from "./cart";

const rootReducer = {
    products: productsReducer,
    cart: cartReducer
}
export default rootReducer;