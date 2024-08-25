import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser, login, signUp, updateUser, verifyOtp } from "./userAction";

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  token?: string
}

const initialState: User = {
  id: 0,
  name: '',
  email: '',
  phone: '',
  token: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      return initialState;
    },
    setEmail: (state, action) => {
      state.email = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state: User, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.id = action.payload.id;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      console.log("rejected");
    });
    builder.addCase(login.fulfilled, (state: User, action: PayloadAction<User>) => {
      state = action.payload
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log("rejected");
    });
    builder.addCase(verifyOtp.fulfilled, (state: User, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.token = action.payload.token
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      console.log("rejected");
    });
    builder.addCase(getUser.fulfilled, (state: User, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.phone = action.payload.phone;
      state.token = action.payload.token
    });
    builder.addCase(getUser.rejected, (state, action) => {
      console.log("rejected");
    });
    builder.addCase(updateUser.fulfilled, (state: User, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.phone = action.payload.phone;
      state.token = action.payload.token
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      console.log("rejected");
    });
  }
})

export const {
  logout,
  setEmail
} = userSlice.actions;

export default userSlice.reducer;
