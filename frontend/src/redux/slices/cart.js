import {createSlice} from "@reduxjs/toolkit";

const items = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const qtyItems = items.reduce((a, b) => a + b.qty, 0);
const itemsPrice = parseFloat(items.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2));
const totalPrice = parseFloat(items.reduce((a, b) => a + (b.priceIVA * b.qty), 0).toFixed(2));
const taxPrice = parseFloat((totalPrice - itemsPrice).toFixed(2));

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items,  
        qtyItems,
        itemsPrice,
        taxPrice,
        totalPrice
    },
    reducers: {
        addItem(state, action){
            const payload = action.payload;
            const item = state.items.find(item => item.id === payload.id);
            if(item){
                item.qty = payload.qty;
            }else{
                state.items.push(payload);
            }
            state.qtyItems = state.items.reduce((a, b) => a + b.qty, 0);
            state.itemsPrice = parseFloat(state.items.reduce((a, b) => a + (b.price *  b.qty), 0).toFixed(2));
            state.totalPrice = parseFloat(state.items.reduce((a, b) => a + (b.priceIVA *  b.qty), 0).toFixed(2));
            state.taxPrice = parseFloat((state.totalPrice - state.itemsPrice).toFixed(2));
            localStorage.setItem("cartItems", JSON.stringify(state.items));

        },
        removeItem(state, action){
            const {id} = action.payload;
            const newItems = state.items.filter(item => item.id !== id);
            state.items = newItems;
            state.qtyItems = state.items.reduce((a, b) => a + b.qty, 0);
            state.itemsPrice = parseFloat(state.items.reduce((a, b) => a + (b.price *  b.qty), 0).toFixed(2));
            state.totalPrice = parseFloat(state.items.reduce((a, b) => a + (b.priceIVA *  b.qty), 0).toFixed(2));
            state.taxPrice = parseFloat((state.totalPrice - state.itemsPrice).toFixed(2));
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        updateItem(state, action){
            const {id, qty} = action.payload;
            const item = state.items.find(item => item.id === id);
            item.qty = qty
            state.qtyItems = state.items.reduce((a, b) => a + b.qty, 0);
            state.itemsPrice = parseFloat(state.items.reduce((a, b) => a + (b.price *  b.qty), 0).toFixed(2));
            state.totalPrice = parseFloat(state.items.reduce((a, b) => a + (b.priceIVA *  b.qty), 0).toFixed(2));
            state.taxPrice = parseFloat((state.totalPrice - state.itemsPrice).toFixed(2));
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        }
    }
})

export const {addItem, removeItem, updateItem} = cartSlice.actions;

export default cartSlice.reducer;