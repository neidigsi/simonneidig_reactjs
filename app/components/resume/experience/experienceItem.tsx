// Import internal dependencies
import type { Experience } from "@/store/slices/experienceSlice";

export default function ExperienceItem({
  experience,
}: Readonly<{
  experience: Experience;
}>) {
  return (
    <div className="pt-4 transition-transform transform hover:scale-105">
      <div
        className={
          "grid grid-cols-1 gap-2 w-full rounded-xl p-5 " +
          (experience.index % 2 == 0 ? "bg-primary/20" : "bg-secondary/20")
        }
      >
        <div className="text-sm text-dark-grey">
          {new Date(experience.start_date).getFullYear()}
          {" - "}
          {experience.end_date > "3"
            ? "present"
            : new Date(experience.end_date).getFullYear()}
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
