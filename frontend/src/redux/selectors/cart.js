export const selectItems = (state) => {
    return state.cart.items
}
export const selectQtyItems = (state) => {
    return state.cart.qtyItems
}
export const selectItemsPrice = (state) => {
    return state.cart.itemsPrice
}
export const selectTaxPrice = (state) => {
    return state.cart.taxPrice
}
export const selectTotalPrice = (state) => {
    return state.cart.totalPrice
}

