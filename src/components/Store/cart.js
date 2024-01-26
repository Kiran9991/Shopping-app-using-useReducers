import { createSlice } from '@reduxjs/toolkit';

const initialCartState = { cartItems: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
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
            if(existingItem.quantity === 0) {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            }
        }
    }
})

export const cartAction = cartSlice.actions;

export default cartSlice.reducer;