import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import axios from "axios";

const initialState = {
  user: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {},
  isloading: false,
  isSuccess: false,
  iserror: false,
  errmesg: "",
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

// ============ === LOGIN END === =================
//=================================================
//=================================================
//=================================================
// ============ === Register Start === ========


export const register = createAsyncThunk('users/register', async(datas, {rejectWithValue})=>{
  try {
    const { data } = await axios.post("http://localhost:5000/api/users/post", {
      userFname: datas.userFname,
      userLname: datas.userLname,
      userPhone: datas.userPhone,
      userLocation: datas.userLocation,
      userEmail: datas.userEmail,
      userpassword: datas.userpassword,
      useraddress: datas.useraddress,
    });

    localStorage.setItem('userData', JSON.stringify(data)) 

  } catch (error) {
    console.log(error)
    return rejectWithValue(error)
  }
})



// ============ === Register end === ========




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
      // LoGIN extraReducers
      .addCase(login.pending, (state, action) => {
        state.isloading = true;
        state.iserror = false;
        state.isSuccess = true;
        state.user = {};
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isloading = false;
        state.iserror = false;
        state.isSuccess = true;
        state.user = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.isloading = false;
        state.iserror = true;
        state.isSuccess = false;
        state.user = {};
        state.errmesg = "something went wrong";
      })
      // REGISTER extraReducers
      .addCase(register.pending, (state, action) => {
        (state.isloading = true), 
        (state.isSuccess = false);
      })
      .addCase(register.fulfilled, (state, action) => {
        (state.isloading = false),
          (state.isSuccess = true),
          (state.errmesg = ""),
          (state.iserror = false),
          (state.user = action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.isloading = false;
        state.iserror = true;
        state.isSuccess = false;
        state.user = {};
        state.errmesg = "something went wrong";
      });
  },
});

export const {logout} = authSlice.actions

export default authSlice;
