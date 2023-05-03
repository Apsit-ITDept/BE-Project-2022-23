import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlices = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      console.log("newItem", newItem);
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.course_id
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.course_id,
          productName: newItem.course_name,
          imgUrl: newItem.imgUrl,
          price: newItem.course_price.replace("$", ""),
          quantity: 1,
          totalPrice: newItem.course_price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.course_price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) =>
          total +
          Number(parseInt(item.price)) * Number(parseInt(item.quantity)),
        0
      );
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) =>
          total + Number(item.course_price) * Number(item.quantity),
        0
      );
    },
  },
});

export const cartActions = cartSlices.actions;

export default cartSlices.reducer;
