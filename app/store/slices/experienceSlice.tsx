// Import external dependencies
import { createSlice } from "@reduxjs/toolkit";

export interface Experience {
  index: number;
  title: string;
  extract: string;
  description: string;
  industry: string;
  url: string;
  start: string;
  end: string;
  company: Institution;
}

export interface Address {
  street: string;
  streetnumber: number;
  zip: number;
  city: string;
  country: string;
}

export interface Institution {
  name: string;
  address: Address;
}

interface ExperienceState {
  loaded: boolean;
  experiences: Experience[];
}

const initialState: ExperienceState = {
  loaded: false,
  experiences: [],
};

export const experienceSlice = createSlice({
  name: "experience",
  initialState: initialState,
  reducers: {
    loadExperiences: (state) => {
      let resp = [
        {
          index: 1,
          title: "Senior Consultant | Financial Services",
          extract:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores.",
          industry: "Credit Risk Management",
          url: "https://prof-schumann.com",
          start: "2024-06-01T00:00:00.000Z",
          end: "3999-12-31T00:00:00.000Z",
          company: {
            name: "SCHUMANN",
            address: {
              street: "Jutta-Limbach-Straße",
              streetnumber: 1,
              zip: 37073,
              city: "Göttingen",
              country: "DE",
            },
          },
        },
        {
          index: 2,
          title: "Consultant | Financial Services",
          extract:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores.",
          industry: "Credit Risk Management",
          url: "https://prof-schumann.com",
          start: "2023-04-01T00:00:00.000Z",
          end: "2024-05-31T00:00:00.000Z",
          company: {
            name: "SCHUMANN",
            address: {
              street: "Jutta-Limbach-Straße",
              streetnumber: 1,
              zip: 37073,
              city: "Göttingen",
              country: "DE",
            },
          },
        },
        {
          index: 3,
          title: "Software Developer",
          extract:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores.",
          industry: "IT Consulting",
          url: "https://odisys.de",
          start: "2019-04-01T00:00:00.000Z",
          end: "2023-03-31T00:00:00.000Z",
          company: {
            name: "OdiSys GmbH",
            address: {
              street: "Karlstraße",
              streetnumber: 34,
              zip: 64283,
              city: "Darmstadt",
              country: "DE",
            },
          },
        },
      ];

      state.experiences = resp;
      state.loaded = true;
    },
  },
});

export const { loadExperiences } = experienceSlice.actions;

export default experienceSlice.reducer;
