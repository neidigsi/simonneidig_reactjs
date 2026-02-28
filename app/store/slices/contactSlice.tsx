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
}

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  creationDate: string;
  language: string;
}

const initialState: ContactState = {
  loaded: false,
  name: "",
  email: "",
  message: "",
  sentSuccessfully: false,
  messages: [],
  messagesLoaded: false,
  messagesLoading: false,
};

export const sendMessage = createAsyncThunk(
  "contact/sendMessage",
  async ({ language }: { language: string }, { getState }) => {
    const state = getState() as { contact: ContactState };
    const resp = await http({
      method: "POST",
      path: "/routes/contact/",
      body: JSON.stringify({
        name: state.contact.name,
        email: state.contact.email,
        message: state.contact.message,
      }),
      language: language,
    });

    return resp;
  }
);

export const fetchMessages = createAsyncThunk(
  "contact/fetchMessages",
  async ({ language }: { language: string }, { rejectWithValue }) => {
    try {
      const resp = await http({
        method: "GET",
        path: "/routes/contact/",
        language: language,
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
      state.loaded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sentSuccessfully = true;
        state.loaded = true;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loaded = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loaded = true;
        state.sentSuccessfully = false;
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
export const { setName, setEmail, setMessage, resetContact } =
  contactSlice.actions;

export default contactSlice.reducer;
