// Import external dependencies
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import EducationList from "@/components/routes/resume/education/educationList";
import educationReducer, {
  Education,
} from "@/store/slices/educationSlice";

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

const mockEducations: Education[] = [
  {
    id: 1,
    degree: "M.Sc.",
    course_of_study: "Computer Science",
    extract: "",
    description: "",
    start_date: "2018-09-01",
    end_date: "2022-06-30",
    university: {
      name: "Example University",
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
    degree: "B.Sc.",
    course_of_study: "Mathematics",
    extract: "",
    description: "",
    start_date: "2015-09-01",
    end_date: "2018-06-30",
    university: {
      name: "Other University",
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

function makeStore(educations: Education[]) {
  return configureStore({
    reducer: { education: educationReducer },
    preloadedState: {
      education: { loaded: true, educations },
    },
  });
}

describe("EducationList Component", () => {
  /**
   * Test to check if the section headline renders even with no entries.
   */
  it("renders headline with empty list", () => {
    render(
      <Provider store={makeStore([])}>
        <EducationList />
      </Provider>
    );

    expect(screen.getByText("main.resume.education")).toBeInTheDocument();
    expect(
      screen.queryByText("M.Sc. Computer Science")
    ).not.toBeInTheDocument();
  });

  /**
   * Test to check if all education entries render from Redux state.
   */
  it("renders all education entries", () => {
    render(
      <Provider store={makeStore(mockEducations)}>
        <EducationList />
      </Provider>
    );

    expect(screen.getByText("main.resume.education")).toBeInTheDocument();
    expect(
      screen.getByText("M.Sc. Computer Science")
    ).toBeInTheDocument();
    expect(screen.getByText("B.Sc. Mathematics")).toBeInTheDocument();
  });
});
