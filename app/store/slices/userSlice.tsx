// Import external dependencies
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Import internal dependencies
import { http } from "@/networking/httpRequest";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

interface Error {
  active: boolean;
  code: string;
}

interface UserState {
  loaded: boolean;
  loggedIn: boolean;
  error: Error;
  jwt: string;
  user: User;
}

const initialState: UserState = {
  loaded: true,
  loggedIn: false,
  jwt: "",
  error: {
    active: false,
    code: "",
  },
  user: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  },
};

export const renewJwt = createAsyncThunk(
  "user/renewJwt",
  async ({ language, }: { language: string }, { rejectWithValue }) => {
    try {
      const username = Cookies.get("email") || "";
      const password = Cookies.get("password") || "";
      if ( username === "" || password === "") {
        return rejectWithValue("No credentials found");
      }

      // Format body as application/x-www-form-urlencoded
      const body = new URLSearchParams();
      body.append("username", username);
      body.append("password", password);

      const resp = await http({
        method: "POST",
        path: "/auth/jwt/login",
        body: body.toString(),
        language: language,
      });

      return resp;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || error.message || "Login failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ language }: { language: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { user: UserState };

      // Format body as application/x-www-form-urlencoded
      const body = new URLSearchParams();
      body.append("username", state.user.user.email);
      body.append("password", state.user.user.password);

      const resp = await http({
        method: "POST",
        path: "/auth/jwt/login",
        body: body.toString(),
        language: language,
      });

      return resp;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || error.message || "Login failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async ({ language, jwt }: { language: string, jwt: string}, { rejectWithValue }) => {
    try {
      console.log("Logging out with JWT:", jwt);
      const resp = await http({
        method: "POST",
        path: "/auth/jwt/logout",
        language: language,
        jwt: jwt,
      });
      return resp.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
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
    // Reset error
    resetError: (state) => {
      state.error.active = false;
      state.error.code = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(renewJwt.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          const token = action.payload.data.access_token;
          state.jwt = token;
          state.loaded = true;
          state.loggedIn = true;
          state.error.active = false;
          state.error.code = "";
          
          document.cookie = `jwt=${token}; path=/; max-age=3600; SameSite=Strict`;
          
          localStorage.setItem("jwt", token);
        }
      })
      .addCase(renewJwt.pending, (state) => {
        state.loaded = false;
        state.error.active = false;
      })
      .addCase(renewJwt.rejected, (state, action) => {
        state.loaded = true;
        state.loggedIn = false;
        state.error.active = true;
        state.error.code = action.payload as string;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          const token = action.payload.data.access_token;
          state.jwt = token;
          state.loaded = true;
          state.loggedIn = true;
          state.error.active = false;
          state.error.code = "";
          
          document.cookie = `jwt=${token}; path=/; max-age=3600; SameSite=Strict`;
          document.cookie = `email=${state.user.email}; path=/; max-age=3600; SameSite=Strict`;
          document.cookie = `password=${state.user.password}; path=/; max-age=3600; SameSite=Strict`;
          
          localStorage.setItem("jwt", token);
        }
      })
      .addCase(login.pending, (state) => {
        state.loaded = false;
        state.error.active = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loaded = true;
        state.loggedIn = false;
        state.error.active = true;
        state.error.code = action.payload as string;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.jwt = "";
        state.loaded = true;
        state.loggedIn = false;
        
        document.cookie = "jwt=; path=/; max-age=0; SameSite=Strict";
        document.cookie = "email=; path=/; max-age=0; SameSite=Strict";
        document.cookie = "password=; path=/; max-age=0; SameSite=Strict";
        
        // Lösche localStorage
        localStorage.removeItem("jwt");
      })
      .addCase(logout.pending, (state) => {
        state.loaded = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loaded = true;
        state.error.active = true;
        state.error.code = action.payload as string;
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
  resetError,
} = userSlice.actions;

export default userSlice.reducer;
