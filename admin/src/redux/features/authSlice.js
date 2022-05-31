import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import * as api from "../api.js";

export const login = createAsyncThunk(
  "auth/login",
  async ({ user, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(user);
      toast.success("Login Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ user, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(user);
      toast.success("Register Successfully");
      navigate("/login");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (id , updatedUserData, toast,{ rejectWithValue }) => {
    try {
      const response = await api.updateUser(id ,updatedUserData);
      toast.success("User Updated Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUsers = createAsyncThunk(
  "Company/getUsers",
  async ({ rejectWithValue }) => {
    try {
      const response = await api.getUsers();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/createUser" , 
  async (userData , toast , {rejectWithValue})=>{
    try{
      const response = await api.createUser(userData);
      toast.success('password updated succesfuly');
      return response.data;
    }catch(err){
      return rejectWithValue(err.response.data)
    }
  }
);
export const deleteUser = createAsyncThunk(
  "auth/deleteUser" , 
  async (id ,toast , {rejectWithValue})=>{
    try{
      const response = await api.deleteUser(id);
      toast.success('user Deleted successfuly');
      return response.data;
    }catch(err){
      return rejectWithValue(err.response.data)
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      // localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createUser.pending] : (state , action) =>{
      state.loading =true
    },
    [createUser.fulfilled] : (state , action) =>{
      state.loading =false
      state.user = action.payload.message
    },
    [createUser.rejected] : (state , action) =>{
      state.loading =false
      state.error = action.payload.message
    },
    [deleteUser.pending] : (state , action) =>{
      state.loading =true
    },
    [deleteUser.fulfilled] : (state , action) =>{
      state.loading =false
      state.user = action.payload.message
    },
    [deleteUser.rejected] : (state , action) =>{
      state.loading =false
      state.error = action.payload.message
    },
    [getUsers.pending] : (state , action) =>{
      state.loading =true
    },
    [getUsers.fulfilled] : (state , action) =>{
      state.loading =false
      state.user = action.payload.message
    },
    [getUsers.rejected] : (state , action) =>{
      state.loading =false
      state.error = action.payload.message
    },
  
   },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
