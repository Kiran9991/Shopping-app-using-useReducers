import { createSlice } from '@reduxjs/toolkit';

const initialCartState = { isCart: false, cartItems: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        setCart(state, action) {
            state.isCart = action.payload;
        },
        addItem(state, action) {
            state.cartItems.push(action.payload);
        },
        removeItem(state, action) {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        }
    }
})

export const cartAction = cartSlice.actions;

export default cartSlice.reducer;