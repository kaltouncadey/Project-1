import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import axios from "axios";

const initialState = {
  user: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {},
  loginloading: false,
  loginSuccess: false,
  loginError: false,
  loginErrorms: "",
};

// api ===> Login

export const login = createAsyncThunk(
  "auth/login",
  async (datas, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          userEmail: datas.userEmail,
          Userpassword: datas.Userpassword,
        }
      );
      if (datas?.status === "Error") {
        return rejectWithValue(data.message || "something went wrong");
      } else {
        localStorage.setItem("userData", JSON.stringify(data));
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ============== === SLICE === =================

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem('userData')
      state.user = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loginloading = true;
        state.loginError = false;
        state.loginSuccess = true;
        state.user = {};
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginloading = false;
        state.loginError = false;
        state.loginSuccess = true;
        state.user = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.loginloading = false;
        state.loginError = true;
        state.loginSuccess = false;
        state.user = {};
        state.loginErrorms = "something went wrong";
      });
  },
});

export const {logout} = authSlice.actions

export default authSlice;
