import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PRODUCTS_URL } from "./constants";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  product: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
};

//getall produts
export const getProducts = createAsyncThunk(
  "products/all",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${PRODUCTS_URL}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        toast.success("products render Successfuly");
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
