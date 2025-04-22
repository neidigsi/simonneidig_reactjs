// Import external dependencies
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

// Import internal dependencies
import "@/assets/css/main.css";
import Card from "@/components/general/card/card";
import { setBackButtonEnabled } from "@/store/slices/settingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Imprint() {
  const backButtonEnabled = useAppSelector(
    (state) => state.settings.backButtonEnabled
  );

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    if (!backButtonEnabled) {
      dispatch(setBackButtonEnabled(true));
    }
  }, []);

  return (
    <Card headline={t("footer.imprint")}>
      <div className="text-base">
        <p dangerouslySetInnerHTML={{ __html: "Abc" }} />
      </div>
    </Card>
  );
}
