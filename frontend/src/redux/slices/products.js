import {createSlice} from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        selectedProduct: {},
        isError: false,
        isLoading: false,
        message: ""
    },
    reducers: {
        getProductRequest(state, action){
            state.isLoading = true;
        },
        getProductSuccess(state, action){
            const payload = action.payload;
            state.selectedProduct = payload;
            state.isLoading = false;
			state.isError = false;
			state.message = ""
        },
        getProductError(state, action){
            const {message} = action.payload
			state.isLoading = false; 
			state.isError = true;
			state.message = message
        },
        getSelectedProduct(state, action){
            const payload = action.payload;
            state.selectedProduct = payload;
        },
        getProductsRequest(state, action){
            state.isLoading = true;
        },
        getProductsSuccess(state, action){
            const payload = action.payload;
            state.products = payload;
            state.isLoading = false;
			state.isError = false;
			state.message = ""
        },
        getProductsError(state, action){
            const {message} = action.payload
			state.isLoading = false; 
			state.isError = true;
			state.message = message
        }
    }
})

export const {getProductRequest, getProductSuccess, getProductError, getSelectedProduct, getProductsError, getProductsRequest, getProductsSuccess, } = productsSlice.actions;

export default productsSlice.reducer;