// Import external dependencies
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Portfolio {
  index: number;
  color: string;
  title: string;
  url: string;
  categories: string[];
  thumbnail: string;
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

export const worksSlice = createSlice({
  name: "works",
  initialState: initialState,
  reducers: {
    filterWorks: (state, action: PayloadAction<string>) => {
      state.currentFilter = action.payload;
      if (action.payload == "All") {
        state.filteredPortfolio = state.portfolio;
      } else {
        state.filteredPortfolio = state.portfolio.filter((item) =>
          item.categories.includes(action.payload)
        );
      }
    },
    loadWorks: (state) => {
      let resp = [
        {
          index: 1,
          title: "Musikverein 1914 Münster e. V.",
          url: "https://mvm1914.de",
          categories: ["WordPress", "Operations"],
          thumbnail: "/images/mvm1914.png",
        },
        {
          index: 2,
          title: "Personal Website",
          url: "https://simon-neidig.de",
          categories: ["Web Development", "UI/UX", "Operations"],
          thumbnail: "/images/personalWebsite.png",
        },
      ];

      // Assign color to element
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
      state.categories = Array.from(
        new Set(resp.flatMap((item) => item.categories))
      );
      state.categories.push("All");
      state.categories.sort((a, b) => a.localeCompare(b));
      state.loaded = true;
    },
  },
});

export const { loadWorks, filterWorks } = worksSlice.actions;

export default worksSlice.reducer;
