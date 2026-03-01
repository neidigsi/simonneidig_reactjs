// Import external dependencies
import { useTranslation } from "react-i18next";

// Import internal dependencies
import type { Education } from "@/store/slices/educationSlice";

/**
 * EducationItem Component
 *
 * Displays a single education entry with degree, course of study, university, and dates.
 * Alternates background color based on index for visual distinction.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param {Object} props - The properties object.
 * @param {number} props.index - The index of the education item in the list.
 * @param {Education} props.education - The education data to display.
 *
 * @returns {JSX.Element} The rendered education item component.
 */
export default function EducationItem({
  index,
  education,
}: Readonly<{
  index: number;
  education: Education;
}>) {
  const { t } = useTranslation();

  return (
    <div className="pt-4 transition-transform transform hover:scale-105">
      <div
        className={
          "grid grid-cols-1 gap-2 w-full rounded-xl p-5 " +
          (index % 2 == 1 ? "bg-primary/20" : "bg-secondary/20")
        }
      >
        <div className="text-sm text-dark-grey">
          {
            education.end_date != null && education.end_date < "3"
              ?
              <>
                {new Date(education.start_date).getFullYear() + " - " + new Date(education.end_date).getFullYear()}
              </>
              : t("main.resume.since") + " " + new Date(education.start_date).getFullYear()
          }
        </div>
        <h3>{education.degree + " " + education.course_of_study}</h3>
        {education.university != undefined && (
          <div className="text-base">
            {education.university.name}
            {" | "}
            {education.university.address.city}
            {", "}
            {education.university.address.country}
          </div>
        )}
      </div>
    </div>
  );
}
