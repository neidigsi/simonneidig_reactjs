// Import external dependencies
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Import internal dependencies
import { http } from "@/networking/httpRequest";

export interface Portfolio {
  id: number;
  color: string;
  title: string;
  url: string;
  categories: Category[];
  thumbnail_id: number;
  index?: number;
}

interface Category {
  name: string;
}

interface WorksState {
  loaded: boolean;
  currentFilter: string;
  portfolio: Portfolio[];
  filteredPortfolio: Portfolio[];
  categories: string[];
}

const initialState: WorksState = {
  loaded: false,
  currentFilter: "All",
  portfolio: [],
  filteredPortfolio: [],
  categories: [],
};

export const loadWorks = createAsyncThunk(
  "expertise/loadWorks",
  async ({ language }: { language: string }) => {
    const resp = await http({
      method: "GET",
      path: "/work/",
      language: language,
    });
    return resp.data;
  }
);

export const worksSlice = createSlice({
  name: "works",
  initialState: initialState,
  reducers: {
    filterWorks: (state, action: PayloadAction<string>) => {
      state.currentFilter = action.payload;
      if (action.payload == "All") {
        state.filteredPortfolio = state.portfolio;
      } else {
        let filtered = state.portfolio.filter((item) =>
          Array.isArray(item.categories)
            ? item.categories.some((cat) => cat?.name === action.payload)
            : false
        );
        
        // Create a new array with map instead of direct mutation
        let j = 0;
        for (let i = 0; i < filtered.length; i++) {
          j += 1;
          if (j < 2) {
            filtered[i] = { ...filtered[i], index: i, color: "secondary" };
          } else {
            j = j % 3;
            filtered[i] = { ...filtered[i], index: i, color: "primary" };
          }
        }

        state.filteredPortfolio = filtered;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWorks.fulfilled, (state, action) => {
        let resp = action.payload;

        // Create a new array with map instead of direct mutation
        let j = 0;
        for (let i = 0; i < resp.length; i++) {
          j += 1;
          if (j < 2) {
            resp[i] = { ...resp[i], index: i, color: "secondary" };
          } else {
            j = j % 3;
            resp[i] = { ...resp[i], index: i, color: "primary" };
          }
        }

        state.portfolio = resp;
        state.filteredPortfolio = resp;

        // Extract category names efficiently
        const categoryNames: string[] = Array.from(
          new Set(
            resp.flatMap((item: { categories: { name: string }[] }) =>
              Array.isArray(item.categories)
                ? item.categories.map((cat) => cat?.name ?? "")
                : []
            )
          )
        ).filter(Boolean) as string[];

        categoryNames.push("All");
        categoryNames.sort((a, b) => a.localeCompare(b));
        state.categories = categoryNames;
        state.loaded = true;
      })
      .addCase(loadWorks.pending, (state) => {
        state.loaded = false;
      })
      .addCase("i18n/changeLanguage", (state) => {
        // Reset state to initial values on language change
        state.loaded = initialState.loaded;
        state.currentFilter = initialState.currentFilter;
        state.portfolio = initialState.portfolio;
        state.filteredPortfolio = initialState.filteredPortfolio;
        state.categories = initialState.categories;
      });
  },
});

export const { filterWorks } = worksSlice.actions;

export default worksSlice.reducer;
