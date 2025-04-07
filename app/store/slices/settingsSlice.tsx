// Import external dependencies
import { createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  language: string;
  isDarkModeEnabled: boolean;
}

const initialState: SettingsState = {
  language: "en",
  isDarkModeEnabled: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    initializeDarkMode: (state) => {
      const storedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
      if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
        state.isDarkModeEnabled = true;
        document.documentElement.classList.add("dark");
      } else {
        state.isDarkModeEnabled = false;
        document.documentElement.classList.remove("dark");
      }
  
    },
    // Toggle dark mode
    toggleDarkMode: (state) => {
      state.isDarkModeEnabled = !state.isDarkModeEnabled;

      if (state.isDarkModeEnabled) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleDarkMode, initializeDarkMode } = settingsSlice.actions;

export default settingsSlice.reducer;
