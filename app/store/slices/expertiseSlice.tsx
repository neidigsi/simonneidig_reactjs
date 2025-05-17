// Import external dependencies
import { http } from "@/networking/httpRequest";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Expertise {
  index: number;
  color: string;
  title: string;
  description: string;
  icon: string;
}

interface ExpertiseState {
  loaded: boolean;
  expertises: Expertise[];
}

const initialState: ExpertiseState = {
  loaded: false,
  expertises: [],
};

export const loadExpertises = createAsyncThunk(
  "expertise/loadExpertises",
  async () => {
    const resp = await http({
      method: "GET",
      path: "/expertise",
    });
    // Assign color to element
    let respData = resp.data;
    let j = 0;
    for (let i = 0; i < respData.length; i++) {
      j += 1;
      if (j < 2) {
        respData[i] = { ...respData[i], index: i, color: "secondary" };
      } else {
        j = j % 3;
        respData[i] = { ...respData[i], index: i, color: "primary" };
      }
    }
    return respData;
  }
);

export const expertiseSlice = createSlice({
  name: "expertise",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadExpertises.fulfilled, (state, action) => {
        state.expertises = action.payload;
        state.loaded = true;
      })
      .addCase(loadExpertises.pending, (state) => {
        state.loaded = false;
      });
  },
});

export default expertiseSlice.reducer;
