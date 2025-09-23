import {
    createSlice
} from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        user: "Demo",
        updatedAt: new Date().toLocaleString(),
        cartItems: [],
        total: 0,
        totalItems : 0
    },
    reducers: {
        addItemTocart: (state, action) => {
            const {
                product,
                quantity
            } = action.payload
            console.log("Añadiendo producto al carrito: ", product, quantity)
            const productInCart = state.cartItems.find(item => item.id === product.id)
            if (!productInCart) {
                state.cartItems.push({
                    ...product,
                    quantity
                })
            } else {
                productInCart.quantity += 1
            }
            state.updatedAt = new Date().toLocaleString();
            state.total = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
            state.totalItems = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
        },
        removeItems: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload);
            if (itemIndex >= 0) {
                if (state.cartItems[itemIndex].quantity > 1) {
                    state.cartItems[itemIndex].quantity -= 1;
                } else {
                    state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
                }
            }
            state.total = state.cartItems.reduce(
                (acc, item) => acc + (item.price * item.quantity),0
            );

            state.updatedAt = new Date().toLocaleString();
            state.totalItems = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
        },
        clearCart: (state, action) => {
            state.cartItems = []
            state.updatedAt = new Date().toLocaleString();
            state.total = 0
            state.totalItems = 0
        }
    }
})

export const {
    addItemTocart,
    removeItems,
    clearCart,
    totalItems
} = cartSlice.actions

export default cartSlice.reducer