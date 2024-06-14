// Import internal dependencies
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import educationReducer from "@/store/slices/educationSlice";
import expertiseReducer from "@/store/slices/expertiseSlice";
import personalInfoReducer from "@/store/slices/personalInfoSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      education: educationReducer,
      expertise: expertiseReducer,
      personalInfo: personalInfoReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
