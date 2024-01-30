import { createSlice } from '@reduxjs/toolkit';

async function getCartItems() {
  const res = await fetch(`https://expensetracker-6f9fd-default-rtdb.firebaseio.com/cart.json`);
  const data = await res.json();
  return data;
}

const items = await getCartItems();

const initialCartState = { cartItems: items.cartItems, totalQuantity: items.totalQuantity };

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
        },
        getItems(state, action) {
            state.cartItems = action.payload.cartItems;
            state.totalQuantity = action.payload.totalQuantity;
        }
    }
})

export const cartAction = cartSlice.actions;

export default cartSlice.reducer;