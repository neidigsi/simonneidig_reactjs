// Import external dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Import internal dependencies
import { http } from "@/networking/httpRequest";

interface ContactState {
  loaded: boolean;
  name: string;
  email: string;
  message: string;
  sentSuccessfully: boolean;
  messages: ContactMessage[];
  messagesLoaded: boolean;
  messagesLoading: boolean;
  error: string | null;
}

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  creationDate: string;
  language: string;
}

const initialState: ContactState = {
  loaded: true,
  name: "",
  email: "",
  message: "",
  sentSuccessfully: false,
  messages: [],
  messagesLoaded: false,
  messagesLoading: false,
  error: null,
};

export const sendMessage = createAsyncThunk(
  "contact/sendMessage",
  async ({ language }: { language: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { contact: ContactState; user: any };
      const { loggedIn, user } = state.user;
      
      // Use user data if logged in, otherwise use form data
      const name = loggedIn 
        ? `${user.firstName} ${user.lastName}`.trim()
        : state.contact.name;
      const email = loggedIn 
        ? user.email
        : state.contact.email;
      
      const resp = await http({
        method: "POST",
        path: "/contact/",
        body: JSON.stringify({
          name: name,
          email: email,
          message: state.contact.message,
        }),
        language: language,
      });

      return resp;
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.message || "Failed to send message";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "contact/fetchMessages",
  async ({ language, jwt }: { language: string; jwt: string }, { rejectWithValue }) => {
    try {
      const resp = await http({
        method: "GET",
        path: "/contact/",
        language: language,
        jwt: jwt,
      });

      return resp;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch messages");
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    // Set the name field
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    // Set the email field
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    // Set the message field
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    // Reset the contact state
    resetContact: (state) => {
      state.name = "";
      state.email = "";
      state.message = "";
      state.sentSuccessfully = false;
      state.error = null;
      state.loaded = true;
    },
    // Reset only the contact sent status (used on logout)
    resetContactStatus: (state) => {
      state.sentSuccessfully = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sentSuccessfully = true;
        state.loaded = true;
        state.error = null;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loaded = false;
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loaded = true;
        state.sentSuccessfully = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.messagesLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messagesLoading = false;
        state.messagesLoaded = true;
        if (action.payload.status === 200 && Array.isArray(action.payload.data)) {
          state.messages = action.payload.data;
        }
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.messagesLoading = false;
        state.messagesLoaded = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setName, setEmail, setMessage, resetContact, resetContactStatus } =
  contactSlice.actions;

export default contactSlice.reducer;
