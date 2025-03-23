// Import internal dependencies
import { Education } from "@/store/slices/educationSlice";

export default function EducationItem({
  education,
}: Readonly<{
  education: Education;
}>) {
  return (
    <div className="pt-4">
      <div
        className={
          "grid grid-cols-1 gap-2 w-full rounded-xl p-5 " +
          (education.index % 2 == 1 ? "bg-primary/20" : "bg-secondary/20")
        }
      >
        <div className="text-sm text-dark-grey">
          {new Date(education.start).getFullYear()}
          {" - "}
          {education.end > "3"
            ? "present"
            : new Date(education.end).getFullYear()}
        </div>
        <h3>{education.subject}</h3>
        <div className="text-base">
          {education.university.name}
          {" | "}
          {education.university.address.city}
          {", "}
          {education.university.address.country}
        </div>
      </div>
    </div>
  );
}
