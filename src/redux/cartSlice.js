import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      requisitionSteps: {},
      approvedData: {},
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existCartItem = state.cartItems.find((x) => x._id === item.id);

      if (existCartItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existCartItem.id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    saveRequisitionMethod: (state, action) => {
      state.requisitionSteps = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    saveApprovedData: (state, action) => {
      state.approvedData = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      state.approvedData = {};
      state.requisitionSteps = {};
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveRequisitionMethod,
  saveApprovedData,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
