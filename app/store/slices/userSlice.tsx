// Import external dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Import internal dependencies
import { http } from "@/networking/httpRequest";

interface User {
  email: string;
  password: string;
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
  user: { email: "", password: "" },
};

export const login = createAsyncThunk(
  "user/login",
  async ({},{ getState }
  ) => {
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
  reducers: {},
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
      .addCase("i18n/changeLanguage", (state) => {
      })
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

export default userSlice.reducer;
