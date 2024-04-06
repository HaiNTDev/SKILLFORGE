import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingCartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingCartItem) {
        toast.error("Khóa học đã có trong giỏ hàng");
      } else {
        const item = action.payload;
        state.cartItems.push(item);
        toast.success("Đã thêm khóa học thành công");
        return state;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.cartItems.splice(index, 1);
        toast.success("Đã xóa khóa học thành công");
      } else {
        toast.error("Khóa học không tồn tại trong giỏ hàng");
      }
    },
    handleDone: () => {
      return initialState;
    },
  },
});

export const { addToCart, removeFromCart, handleDone } = cartSlice.actions;

export default cartSlice.reducer;
