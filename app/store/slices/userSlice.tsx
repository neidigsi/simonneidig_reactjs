// Import external dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Import internal dependencies
import { http } from "@/networking/httpRequest";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  isSuperUser: boolean;
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
    isSuperUser: false,
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

export const register = createAsyncThunk(
  "user/register",
  async ({ language }: { language: string }, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState() as { user: UserState };

      const resp = await http({
        method: "POST",
        path: "/auth/register",
        body: {
          first_name: state.user.user.firstName,
          last_name: state.user.user.lastName,
          email: state.user.user.email,
          password: state.user.user.password,
        },
        language: language,
      });

      // Login the user automatically after successful registration
      if (resp.status === 201) {
        dispatch(login({ language }));
      }

      return resp;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || error.message || "Registration failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async ({ language, jwt }: { language: string; jwt: string }, { rejectWithValue }) => {
    try {
      const resp = await http({
        method: "GET",
        path: "/users/me",
        language: language,
        jwt: jwt,
      });
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch user profile");
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
      .addCase(register.pending, (state) => {
        state.loaded = false;
        state.error.active = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loaded = true;
        state.loggedIn = false;
        state.error.active = true;
        state.error.code = action.payload as string;
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
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        if (action.payload.status === 200 && action.payload.data) {
          const userData = action.payload.data;
          state.user.isSuperUser = userData.is_superuser || false;
          state.user.firstName = userData.first_name || "";
          state.user.lastName = userData.last_name || "";
          state.loaded = true;
        }
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loaded = true;
        state.user.isSuperUser = false;
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
