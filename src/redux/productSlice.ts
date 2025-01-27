import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface ProductState {
  categories: Category[];
  products: Product[];
  loading: boolean;
  totalProducts: number;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  page: number;
}

const initialState: ProductState = {
  categories: [],
  products: [],
  totalProducts: 0,
  loading: false,
  error: null,
  searchTerm: "",
  selectedCategory: "",
  page: 1,
};

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await axios.get<Category[]>(
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
    searchTerm,
  }: {
    category: string;
    page: number;
    searchTerm: string;
  }) => {
    const BaseUrl = `https://dummyjson.com/products`;
    let url = BaseUrl + `?limit=10&skip=${(page - 1) * 10}`;
    if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=10&skip=${
        (page - 1) * 10
      }`;
    }
    if (searchTerm) {
      url =
        BaseUrl + `/search?q=${searchTerm}&limit=10&skip=${(page - 1) * 10}`;
    }
    const response = await axios.get<{ products: Product[]; total: number }>(
      url
    );
    const responseObject = {
      products: response.data.products,
      total: response.data.total,
    };
    return responseObject;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.page = 1;
      state.products = [];
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.page = 1;
      state.products = [];
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
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.totalProducts = action.payload.total;
        if (state.page === 1) {
          state.products = action.payload.products;
        } else {
          state.products = [...state.products, ...action.payload.products];
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
