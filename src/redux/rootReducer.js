import { combineReducers } from "@reduxjs/toolkit";
import accountSlice from "./feature/accountSlice";
import cartSlice from "./feature/cartSlice";
import courseSlice from "./feature/courseSlice";

const rootReducer = combineReducers({
  account: accountSlice,
  cart: cartSlice,
});

export default rootReducer;
