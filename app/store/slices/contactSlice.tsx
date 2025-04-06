// Import external dependencies
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ContactState {
  loaded: boolean;
  name: string;
  email: string;
  message: string;
  sent: boolean;
}

const initialState: ContactState = {
  loaded: true,
  name: "",
  email: "",
  message: "",
  sent: false,
};

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
    sendMessage: (state) => {
      // Simulate sending the message
      console.log("Sending message...");
      console.log(`Name: ${state.name}`);
      console.log(`Email: ${state.email}`);
      console.log(`Message: ${state.message}`);
      state.sent = true;
      state.loaded = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName, setEmail, setMessage, sendMessage } = contactSlice.actions;

export default contactSlice.reducer;
