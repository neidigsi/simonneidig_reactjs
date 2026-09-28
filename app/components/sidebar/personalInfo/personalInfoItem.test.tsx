import { render, screen } from "@testing-library/react";
import PersonalInfoItem from "@/components/sidebar/personalInfo/personalInfoItem";

describe("PersonalInfoItem", () => {
  it("renders label and value", () => {
    render(<PersonalInfoItem label="Email" value="test@example.com" icon="EnvelopeIcon" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("renders different label/value pairs", () => {
    render(<PersonalInfoItem label="Phone" value="+123" icon="PhoneIcon" />);
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("+123")).toBeInTheDocument();
  });
});
