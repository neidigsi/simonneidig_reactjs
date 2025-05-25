// Import external dependencies
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

// Import internal dependencies
import "@/assets/css/main.css";
import { useAppSelector } from "@/store/hooks";
import Card from "@/components/general/card/card";
import Button from "@/components/general/button/button";

export default function Error404() {
  const isDarkModeEnabled = useAppSelector(
    (state) => state.settings.isDarkModeEnabled
  );

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card headline={t("error.not-found.title")}>
      <div className="flex flex-col items-center justify-center mb-4">
        <img
          src={
            isDarkModeEnabled ? "/images/dark_404.png" : "/images/light_404.png"
          }
          alt="404 Not Found"
          className="rounded-xl max-w-[400px] mb-6"
        />
        <p className="mb-4">{t("error.not-found.description")}</p>
        <Button
          text={t("error.not-found.button")}
          icon="ArrowUturnLeftIcon"
          onClick={() => navigate("/")}
          inverted={true}
          className="mt-4"
        />
      </div>
    </Card>
  );
}
