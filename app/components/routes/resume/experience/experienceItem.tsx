// Import external dependencies
import { useTranslation } from "react-i18next";

// Import internal dependencies
import type { Experience } from "@/store/slices/experienceSlice";

/**
 * ExperienceItem Component
 *
 * Displays a single work experience entry with title, company, and dates.
 * Alternates background color based on index for visual distinction.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param {Object} props - The properties object.
 * @param {number} props.index - The index of the experience item in the list.
 * @param {Experience} props.experience - The experience data to display.
 *
 * @returns {JSX.Element} The rendered experience item component.
 */
export default function ExperienceItem({
  index,
  experience,
}: Readonly<{
  index: number;
  experience: Experience;
}>) {
  const { t } = useTranslation();

  return (
    <div className="pt-4 animate-glass-rise">
      <div
        className={
          "glass-item glass-shine grid grid-cols-1 gap-2 w-full rounded-[20px] p-5 "
        }
      >
        <div className="text-sm text-dark-grey">
          {
            experience.end_date != null && experience.end_date < "3"
              ?
              <>
                {new Date(experience.start_date).getFullYear() + " - " + new Date(experience.end_date).getFullYear()}
              </>
              : t("main.resume.since") + " " + new Date(experience.start_date).getFullYear()
          }
        </div>
        <h3>{experience.title}</h3>
        {experience.company != undefined && (
          <div className="text-base">
            {experience.company.name}
            {" | "}
            {experience.company.address.city}
            {", "}
            {experience.company.address.country}
          </div>
        )}
      </div>
    </div>
  );
}
