// Import internal dependencies
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import contactReducer from "@/store/slices/contactSlice";
import educationReducer from "@/store/slices/educationSlice";
import experienceReducer from "@/store/slices/experienceSlice";
import expertiseReducer from "@/store/slices/expertiseSlice";
import personalInfoReducer from "@/store/slices/personalInfoSlice";
import settingsReducer from "@/store/slices/settingsSlice";
import worksReducer from "@/store/slices/worksSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      contact: contactReducer,
      education: educationReducer,
      experience: experienceReducer,
      expertise: expertiseReducer,
      personalInfo: personalInfoReducer,
      settings: settingsReducer,
      works: worksReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
