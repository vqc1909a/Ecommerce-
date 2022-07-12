export const selectSelectedProduct = (state) => {
    return state.products.selectedProduct;
}
export const selectMessage = (state) => {
    return state.products.message
}
export const selectIsError = (state) => {
    return state.products.isError
}
export const selectIsLoading = (state) => {
    return state.products.isLoading
}
export const selectProducts = (state) => {
    return state.products.products
}