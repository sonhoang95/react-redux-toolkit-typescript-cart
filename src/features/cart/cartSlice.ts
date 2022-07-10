import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type CartItemType = {
  id: string;
  title: string;
  price: string;
  img: string;
  amount: number;
};

export type CartState = {
  cart: CartItemType[];
  isLoading: boolean;
  total: number;
  amount: number;
};

const API_URL = "https://course-api.com/react-useReducer-cart-project";

export const getCartItems = createAsyncThunk<CartItemType[]>(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.log(thunkAPI.rejectWithValue("Something went wrong"));
    }
  }
);

const initialState: CartState = {
  cart: [],
  isLoading: false,
  total: 0,
  amount: 4,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = [];
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.cart = state.cart.filter((cartItem) => cartItem.id !== id);
    },
    increase: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const cartItem = state.cart.find((item) => item.id === id);
      if (cartItem) {
        cartItem.amount = cartItem.amount + 1;
      }
    },
    decrease: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const cartItem = state.cart.find((item) => item.id === id);
      if (cartItem) {
        cartItem.amount = cartItem.amount - 1;
      }
    },
    calculateTotal: (state) => {
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          cartTotal.amount += amount;
          cartTotal.total += parseFloat(price) * amount;
          return cartTotal;
        },
        { total: 0, amount: 0 }
      );
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      });
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
