// Import external dependencies
import { createSlice } from "@reduxjs/toolkit";

// Import internal dependencies
import type { Institution } from "@/store/slices/experienceSlice";

export interface Education {
  index: number;
  subject: string;
  extract: string;
  description: string;
  start: string;
  end: string;
  university: Institution;
}

interface EducationState {
  loaded: boolean;
  educations: Education[];
}

const initialState: EducationState = {
  loaded: false,
  educations: [],
};

export const educationSlice = createSlice({
  name: "education",
  initialState: initialState,
  reducers: {
    loadEducations: (state) => {
      let resp = [
        {
          index: 1,
          subject: "M.Sc. Entrepreneurship and Innovation Management",
          grade: 1.65,
          extract:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores.",
          start: "2022-04-01T00:00:00.000Z",
          end: "2023-03-31T00:00:00.000Z",
          university: {
            name: "Technical University of Darmstadt",
            address: {
              street: "Karolinenplatz",
              streetnumber: 5,
              zip: 64289,
              city: "Darmstadt",
              country: "DE",
            },
          },
        },
        {
          index: 2,
          subject: "M.Sc. Business Information Systems",
          grade: 1.51,
          extract:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores.",
          start: "2020-10-01T00:00:00.000Z",
          end: "2022-09-30T00:00:00.000Z",
          university: {
            name: "Technical University of Darmstadt",
            address: {
              street: "Karolinenplatz",
              streetnumber: 5,
              zip: 64289,
              city: "Darmstadt",
              country: "DE",
            },
          },
        },
        {
          index: 3,
          subject: "B.Sc. Business Information Systems",
          grade: 1.75,
          extract:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores.",
          start: "2017-10-01T00:00:00.000Z",
          end: "2020-09-30T00:00:00.000Z",
          university: {
            name: "Technical University of Darmstadt",
            address: {
              street: "Karolinenplatz",
              streetnumber: 5,
              zip: 64289,
              city: "Darmstadt",
              country: "DE",
            },
          },
        },
      ];

      state.educations = resp;
      state.loaded = true;
    },
  },
});

export const { loadEducations } = educationSlice.actions;

export default educationSlice.reducer;
