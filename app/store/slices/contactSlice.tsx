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
}

const initialState: ContactState = {
  loaded: false,
  name: "",
  email: "",
  message: "",
  sentSuccessfully: false,
};

export const sendMessage = createAsyncThunk(
  "expertise/sendMessage",
  async (
    { language }: { language: string },
    { getState }
  ) => {
    const state = getState() as { contact: ContactState };
    const resp = await http({
      method: "POST",
      path: "/contact/",
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

export const educationSlice = createSlice({
  name: "education",
  initialState: initialState,
  reducers: {},
});

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
    }
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
      });
  },
});

// Action creators are generated for each case reducer function
export const { setName, setEmail, setMessage, resetContact } = contactSlice.actions;

export default contactSlice.reducer;
