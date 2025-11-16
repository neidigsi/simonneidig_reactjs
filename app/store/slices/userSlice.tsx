// Import external dependencies
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Import internal dependencies
import { http } from "@/networking/httpRequest";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

interface UserState {
  loaded: boolean;
  loggedIn: boolean;
  jwt?: string;
  user: User;
}

const initialState: UserState = {
  loaded: false,
  loggedIn: true,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  },
};

export const login = createAsyncThunk(
  "user/login",
  async ({}, { getState }) => {
    const state = getState() as { user: UserState };
    const resp = await http({
      method: "POST",
      path: "/auth/jwt/login/",
      body: JSON.stringify({
        username: state.user.user.email,
        password: state.user.user.password,
      }),
    });
    return resp.data;
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async ({ language }: { language: string }) => {
    const resp = await http({
      method: "POST",
      path: "/auth/jwt/logout/",
      language: language,
    });
    return resp.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set the first name field
    setFirstName: (state, action: PayloadAction<string>) => {
      state.user.firstName = action.payload;
    },
    // Set the last name field
    setLastName: (state, action: PayloadAction<string>) => {
      state.user.lastName = action.payload;
    },
    // Set the e-mail field
    setEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    // Set the password field
    setPassword: (state, action: PayloadAction<string>) => {
      state.user.password = action.payload;
    },
    // Set the repeat password field
    setRepeatPassword: (state, action: PayloadAction<string>) => {
      state.user.repeatPassword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.jwt = action.payload.access_token;
        state.loaded = true;
        state.loggedIn = true;
      })
      .addCase(login.pending, (state) => {
        state.loaded = false;
      })
      .addCase("i18n/changeLanguage", (state) => {})
      .addCase(logout.fulfilled, (state, action) => {
        state.jwt = action.payload.access_token;
        state.loaded = true;
        state.loggedIn = false;
      })
      .addCase(logout.pending, (state) => {
        state.loaded = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setRepeatPassword,
} = userSlice.actions;

export default userSlice.reducer;
