// Import internal dependencies
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import educationReducer from "@/store/slices/educationSlice";
import personalInfoReducer from "@/store/slices/personalInfoSlice";

export const store = configureStore({
  reducer: {
    education: educationReducer,
    personalInfo: personalInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
