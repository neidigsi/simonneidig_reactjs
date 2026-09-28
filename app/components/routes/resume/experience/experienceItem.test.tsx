// Import external dependencies
import { render, screen } from "@testing-library/react";

// Import internal dependencies
import ExperienceItem from "@/components/routes/resume/experience/experienceItem";
import type { Experience } from "@/store/slices/experienceSlice";

// Mock react-i18next: return the key so tests stay locale-independent
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const baseExperience: Experience = {
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
};

describe("ExperienceItem Component", () => {
  /**
   * Test to check if a finished experience renders the year range,
   * title and company details.
   */
  it("renders finished experience with year range and company", () => {
    render(<ExperienceItem index={0} experience={baseExperience} />);

    expect(screen.getByText("2020 - 2023")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText(/Example Corp/)).toBeInTheDocument();
    expect(screen.getByText(/Berlin/)).toBeInTheDocument();
    expect(screen.getByText(/Germany/)).toBeInTheDocument();
  });

  /**
   * Test to check if an ongoing experience (no end date) renders the
   * "since" label with the start year.
   */
  it("renders ongoing experience with since label", () => {
    render(
      <ExperienceItem
        index={1}
        experience={{ ...baseExperience, end_date: null as unknown as string }}
      />
    );

    expect(screen.getByText("main.resume.since 2020")).toBeInTheDocument();
    expect(screen.queryByText("2020 - 2023")).not.toBeInTheDocument();
  });

  /**
   * Test to check if no company details render when company is missing.
   */
  it("renders without company details when company is undefined", () => {
    render(
      <ExperienceItem
        index={0}
        experience={{ ...baseExperience, company: undefined as any }}
      />
    );

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.queryByText(/Example Corp/)).not.toBeInTheDocument();
  });
});
