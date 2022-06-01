import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createProduct = createAsyncThunk(
  "Product/createProduct",
  async ({ updatedProductData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createProduct(updatedProductData);
      toast.success("Product Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProducts = createAsyncThunk(
  "Product/getProducts",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getProducts(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProduct = createAsyncThunk(
  "Product/getProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getProduct(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const likeProduct = createAsyncThunk(
  "Product/likeProduct",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeProduct(_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProductsByUser = createAsyncThunk(
  "Product/getProductsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getProductsByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const wichListProducts = createAsyncThunk(
  "Product/getProductsByUser",
  async ({ rejectWithValue }) => {
    try {
      let productArray = JSON.parse(localStorage.getItem("wishList"));
      const response = await api.getWishProduct(productArray);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "Product/deleteProduct",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteProduct(id);
      toast.success("Product Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "Product/updateProduct",
  async ({ id, updatedProductData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateProduct(updatedProductData, id);
      toast.success("Product Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchProducts = createAsyncThunk(
  "Product/searchProducts",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getProductsBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchProductsDomaines = createAsyncThunk(
  "Product/searchProductsdomaines",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getProductsBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchProductsPays = createAsyncThunk(
  "Product/searchProductspays",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getProductsBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProductsByDomaines = createAsyncThunk(
  "Product/getDomaineProducts",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getDomaineProducts(tag);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRelatedProducts = createAsyncThunk(
  "Product/getRelatedProducts",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedProducts(tags);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    Product: {},
    Products: [],
    userProducts: [],
    tagProducts: [],
    relatedProducts: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [createProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.Products = [action.payload];
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.Products = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.Product = action.payload;
    },
    [getProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProductsByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userProducts = action.payload;
    },
    [getProductsByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userProducts = state.userProducts.filter((item) => item._id !== id);
        state.Products = state.Products.filter((item) => item._id !== id);
      }
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userProducts = state.userProducts.map((item) =>
          item._id === id ? action.payload : item
        );
        state.Products = state.Products.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [likeProduct.pending]: (state, action) => {},
    [likeProduct.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.Products = state.Products.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    },
    [likeProduct.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [searchProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [searchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.searchProducts = action.payload;
    },
    [searchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProductsByDomaines.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductsByDomaines.fulfilled]: (state, action) => {
      state.loading = false;
      state.domaineProduct = action.payload;
    },
    [getProductsByDomaines.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getRelatedProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getRelatedProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.relatedProducts = action.payload;
    },
    [getRelatedProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [wichListProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [wichListProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.wishProducts = action.payload;
    },
    [wichListProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = ProductSlice.actions;

export default ProductSlice.reducer;
