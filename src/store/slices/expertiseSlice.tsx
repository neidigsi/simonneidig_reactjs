// Import external dependencies
import { createSlice } from "@reduxjs/toolkit";

interface Expertise {
  index: number;
  expertise: string;
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

export const expertiseSlice = createSlice({
  name: "expertise",
  initialState: initialState,
  reducers: {
    loadExpertises: (state) => {
      let resp = [
        {
          expertise: "Software Engineering",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores.",
          icon: "CodeBracketIcon",
        },
        {
          expertise: "IT Project Management",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores.",
          icon: "ChartBarIcon",
        },
        {
          expertise: "Agile Transformation",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores.",
          icon: "ArrowPathIcon",
        },
        {
          expertise: "Fun",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores.",
          icon: "StarIcon",
        },
      ];

      resp.map((o, index) => ({ ...o, index: index }));
      state.expertises = resp;
      state.loaded = true;
    },
  },
});

export const { loadExpertises } = expertiseSlice.actions;

export default expertiseSlice.reducer;
