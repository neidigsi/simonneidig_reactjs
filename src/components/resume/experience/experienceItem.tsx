// Import internal dependencies
import { Experience } from "@/store/slices/experienceSlice";

export default function ExperienceItem({
  experience,
}: Readonly<{
  experience: Experience;
}>) {
  return (
    <div className="pt-4">
      <div
        className={
          "grid grid-cols-1 gap-2 w-full rounded-2xl bg-opacity-20 p-5 " +
          (experience.index % 2 == 0 ? "bg-primary" : "bg-secondary")
        }
      >
        <div className="text-sm text-dark-grey">
          {new Date(experience.start).getFullYear()}
          {" - "}
          {experience.end > "3"
            ? "present"
            : new Date(experience.end).getFullYear()}
        </div>
        <h3>{experience.title}</h3>
        <div className="text-base">
          {experience.company.name}
          {" | "}
          {experience.company.address.city}
          {", "}
          {experience.company.address.country}
        </div>
      </div>
    </div>
  );
}
