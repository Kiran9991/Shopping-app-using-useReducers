import { createSlice } from '@reduxjs/toolkit';

const initialCartState = { cartItems: [], totalQuantity: 0 };

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if(existingItem) {
                existingItem.quantity++;
                existingItem.total += existingItem.price 
            }else {
                state.cartItems.push(newItem);
            }
        },
        removeItem(state, action) {
            const existingItem = state.cartItems.find(item => item.id === action.payload);
            existingItem.quantity--;
            existingItem.total -= existingItem.price;
            state.totalQuantity--;
            if(existingItem.quantity === 0) {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            }
        }
    }
})

export const cartAction = cartSlice.actions;

export default cartSlice.reducer;