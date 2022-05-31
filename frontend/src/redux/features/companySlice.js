import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createCompany = createAsyncThunk(
  "Company/createCompany",
  async ({ updatedCompanyData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createCompany(updatedCompanyData);
      toast.success("Company Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCompanys = createAsyncThunk(
  "Company/getCompanys",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getCompanys(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCompany = createAsyncThunk(
  "Company/getCompany",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getCompany(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const likeCompany = createAsyncThunk(
  "Company/likeCompany",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeCompany(_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCompanysByUser = createAsyncThunk(
  "Company/getCompanysByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getCompanysByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCompany = createAsyncThunk(
  "Company/deleteCompany",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteCompany(id);
      toast.success("Company Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCompany = createAsyncThunk(
  "Company/updateCompany",
  async ({ id, updatedCompanyData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateCompany(updatedCompanyData, id);
      toast.success("Company Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchCompanys = createAsyncThunk(
  "Company/searchCompanys",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getCompanysBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchCompanysDomaines = createAsyncThunk(
  "Company/searchCompanysdomaines",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getCompanysBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchCompanysPays = createAsyncThunk(
  "Company/searchCompanyspays",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getCompanysBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCompanysByDomaines = createAsyncThunk(
  "Company/getDomaineCompanys",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getDomaineCompanys(tag);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRelatedCompanys = createAsyncThunk(
  "Company/getRelatedCompanys",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedCompanys(tags);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const CompanySlice = createSlice({
  name: "Company",
  initialState: {
    Company: {},
    Companys: [],
    userCompanys: [],
    tagCompanys: [],
    relatedCompanys: [],
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
    [createCompany.pending]: (state, action) => {
      state.loading = true;
    },
    [createCompany.fulfilled]: (state, action) => {
      state.loading = false;
      state.Companys = [action.payload];
    },
    [createCompany.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCompanys.pending]: (state, action) => {
      state.loading = true;
    },
    [getCompanys.fulfilled]: (state, action) => {
      state.loading = false;
      state.Companys = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getCompanys.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCompany.pending]: (state, action) => {
      state.loading = true;
    },
    [getCompany.fulfilled]: (state, action) => {
      state.loading = false;
      state.Company = action.payload;
    },
    [getCompany.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCompanysByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getCompanysByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userCompanys = action.payload;
    },
    [getCompanysByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteCompany.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCompany.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userCompanys = state.userCompanys.filter((item) => item._id !== id);
        state.Companys = state.Companys.filter((item) => item._id !== id);
      }
    },
    [deleteCompany.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateCompany.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCompany.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userCompanys = state.userCompanys.map((item) =>
          item._id === id ? action.payload : item
        );
        state.Companys = state.Companys.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateCompany.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [likeCompany.pending]: (state, action) => {},
    [likeCompany.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.Companys = state.Companys.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    },
    [likeCompany.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [searchCompanys.pending]: (state, action) => {
      state.loading = true;
    },
    [searchCompanys.fulfilled]: (state, action) => {
      state.loading = false;
      state.Companys = action.payload;
    },
    [searchCompanys.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCompanysByDomaines.pending]: (state, action) => {
      state.loading = true;
    },
    [getCompanysByDomaines.fulfilled]: (state, action) => {
      state.loading = false;
      state.tagCompanys = action.payload;
    },
    [getCompanysByDomaines.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getRelatedCompanys.pending]: (state, action) => {
      state.loading = true;
    },
    [getRelatedCompanys.fulfilled]: (state, action) => {
      state.loading = false;
      state.relatedCompanys = action.payload;
    },
    [getRelatedCompanys.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = CompanySlice.actions;

export default CompanySlice.reducer;
