import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
}

interface ProductState {
  categories: string[];
  products: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  page: number;
}

const initialState: ProductState = {
  categories: [],
  products: [],
  loading: false,
  error: null,
  searchTerm: "",
  selectedCategory: "",
  page: 1,
};

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await axios.get<string[]>(
      "https://dummyjson.com/products/categories"
    );
    return response.data;
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    category,
    page,
    search,
  }: {
    category: string;
    page: number;
    search: string;
  }) => {
    let url = `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`;
    if (category)
      url = `https://dummyjson.com/products/category/${category}?limit=10&skip=${
        (page - 1) * 10
      }`;
    if (search) url += `&q=${search}`;

    const response = await axios.get<{ products: Product[] }>(url);
    return response.data.products;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.page = 1;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.page = 1;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (state.page === 1) {
          state.products = action.payload;
        } else {
          state.products = [...state.products, ...action.payload];
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});
export const { setCategory, setSearch, incrementPage } = productSlice.actions;
export default productSlice.reducer;
