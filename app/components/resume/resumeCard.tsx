// Import internal dependencies
import Card from "@/components/general/card";
import EducationList from "./education/educationList";
import ExperienceList from "./experience/experienceList";

export default function ResumeCard() {
  return (
    <Card headline="Resume">
      <div className="text-base grid grid-cols-1 lg:grid-cols-2  gap-4">
        <div className="col-span-1">
          <ExperienceList />
        </div>
        <div className="col-span-1">
          <EducationList />
        </div>
      </div>
    </Card>
  );
}
