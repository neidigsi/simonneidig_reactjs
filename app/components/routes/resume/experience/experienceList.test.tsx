// Import external dependencies
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import ExperienceList from "@/components/routes/resume/experience/experienceList";
import experienceReducer, {
  Experience,
} from "@/store/slices/experienceSlice";

// Mock react-i18next: return the key so tests stay locale-independent
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock the http layer (import.meta.env is unavailable under Jest)
jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

const mockExperiences: Experience[] = [
  {
    id: 1,
    title: "Software Engineer",
    extract: "",
    description: "",
    industry: "IT",
    url: "https://example.com",
    start_date: "2020-01-01",
    end_date: "2023-12-31",
    company: {
      name: "Example Corp",
      address: {
        street: "Main Street",
        streetnumber: 1,
        zip: 12345,
        city: "Berlin",
        country: "Germany",
      },
    },
  },
  {
    id: 2,
    title: "Junior Developer",
    extract: "",
    description: "",
    industry: "IT",
    url: "https://example.org",
    start_date: "2018-01-01",
    end_date: "2019-12-31",
    company: {
      name: "Other Corp",
      address: {
        street: "Side Street",
        streetnumber: 2,
        zip: 54321,
        city: "Munich",
        country: "Germany",
      },
    },
  },
];

function makeStore(experiences: Experience[]) {
  return configureStore({
    reducer: { experience: experienceReducer },
    preloadedState: {
      experience: { loaded: true, experiences },
    },
  });
}

describe("ExperienceList Component", () => {
  /**
   * Test to check if the section headline renders even with no entries.
   */
  it("renders headline with empty list", () => {
    render(
      <Provider store={makeStore([])}>
        <ExperienceList />
      </Provider>
    );

    expect(screen.getByText("main.resume.experience")).toBeInTheDocument();
    expect(screen.queryByText("Software Engineer")).not.toBeInTheDocument();
  });

  /**
   * Test to check if all experience entries render from Redux state.
   */
  it("renders all experience entries", () => {
    render(
      <Provider store={makeStore(mockExperiences)}>
        <ExperienceList />
      </Provider>
    );

    expect(screen.getByText("main.resume.experience")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Junior Developer")).toBeInTheDocument();
  });
});
