// Import internal dependencies
import Card from "@/components/general/card/card";
import TextInput from "@/components/general/input/textInput";
import {
  setName,
  setEmail,
  setMessage,
  sendMessage,
} from "@/store/slices/contactSlice";
import Button from "@/components/general/button/button";
import TextareaInput from "@/components/general/input/textareaInput";
import "@/assets/css/main.css";

// Import external dependencies
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const name = useAppSelector((state) => state.contact.name);
  const email = useAppSelector((state) => state.contact.email);
  const message = useAppSelector((state) => state.contact.message);
  const language = useAppSelector((state) => state.settings.language);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  return (
    <Card headline={t("main.contact.title")}>
      {t("main.contact.description")}
      <div className="mt-4 grid grid-cols-1 gap-2 w-full rounded-xl p-5 bg-dark-grey/20 text-base">
        <h2 className="text-lg">{t("main.contact.form.headline")}</h2>
        <TextInput
          id="txt-contact-name"
          label={t("main.contact.form.name")}
          value={name}
          onChange={(value: string) => dispatch(setName(value))}
        />
        <TextInput
          id="txt-contact-email"
          label={t("main.contact.form.email")}
          value={email}
          onChange={(value: string) => dispatch(setEmail(value))}
        />
        <TextareaInput
          id="txt-contact-message"
          label={t("main.contact.form.message")}
          value={message}
          onChange={(value: string) => dispatch(setMessage(value))}
        />
        <Button
          id="btn-contact-send"
          text={t("main.contact.form.submit")}
          icon="PaperAirplaneIcon"
          className="mt-4"
          disabled={
            name.length === 0 || email.length === 0 || message.length === 0
          }
          onClick={() => dispatch(sendMessage({ language: language }))}
        />
      </div>
    </Card>
  );
}
