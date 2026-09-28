// Import external dependencies
import { render, screen } from "@testing-library/react";

// Import internal dependencies
import EducationItem from "@/components/routes/resume/education/educationItem";
import type { Education } from "@/store/slices/educationSlice";

// Mock react-i18next: return the key so tests stay locale-independent
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const baseEducation: Education = {
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
};

describe("EducationItem Component", () => {
  /**
   * Test to check if a finished education renders the year range,
   * degree, course of study and university details.
   */
  it("renders finished education with year range and university", () => {
    render(<EducationItem index={0} education={baseEducation} />);

    expect(screen.getByText("2018 - 2022")).toBeInTheDocument();
    expect(
      screen.getByText("M.Sc. Computer Science")
    ).toBeInTheDocument();
    expect(screen.getByText(/Example University/)).toBeInTheDocument();
    expect(screen.getByText(/Berlin/)).toBeInTheDocument();
    expect(screen.getByText(/Germany/)).toBeInTheDocument();
  });

  /**
   * Test to check if an ongoing education (no end date) renders the
   * "since" label with the start year.
   */
  it("renders ongoing education with since label", () => {
    render(
      <EducationItem
        index={1}
        education={{ ...baseEducation, end_date: null as unknown as string }}
      />
    );

    expect(screen.getByText("main.resume.since 2018")).toBeInTheDocument();
    expect(screen.queryByText("2018 - 2022")).not.toBeInTheDocument();
  });

  /**
   * Test to check if no university details render when university is missing.
   */
  it("renders without university details when university is undefined", () => {
    render(
      <EducationItem
        index={0}
        education={{ ...baseEducation, university: undefined as any }}
      />
    );

    expect(
      screen.getByText("M.Sc. Computer Science")
    ).toBeInTheDocument();
    expect(screen.queryByText(/Example University/)).not.toBeInTheDocument();
  });
});
