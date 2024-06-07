// Import internal dependencies
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Card from "@/components/general/card";
import { useEffect } from "react";
import { loadPersonalInfo } from "@/store/slices/personalInfoSlice";

export default function AboutCard() {
  const abstract = useAppSelector((state) => state.personalInfo.abstract);
  const loaded = useAppSelector((state) => state.personalInfo.loaded);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPersonalInfo());
  }, []);
  return (
    <Card headline="About">
      <div className="text-base">
        <p dangerouslySetInnerHTML={{ __html: abstract }} />
      </div>
    </Card>
  );
}
