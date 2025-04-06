// Import internal dependencies
import Card from "@/components/general/card";
import TextInput from "../general/input/textInput";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  setName,
  setEmail,
  setMessage,
  sendMessage,
} from "@/store/slices/contactSlice";
import Button from "../general/button";

export default function ContactCard() {
  const name = useAppSelector((state) => state.contact.name);
  const email = useAppSelector((state) => state.contact.email);
  const message = useAppSelector((state) => state.contact.message);

  const dispatch = useAppDispatch();

  return (
    <Card headline="Contact">
      Would you like to <b>get in touch</b> with me? I look forward to{" "}
      <b>your message!</b>
      <div className="mt-4 grid grid-cols-1 gap-2 w-full rounded-xl p-5 bg-dark-grey/20 text-base">
        <h2 className="text-lg">Form</h2>
        <TextInput
          id="txt-contact-name"
          label="Name"
          value={name}
          onChange={(value: string) => dispatch(setName(value))}
        />
        <TextInput
          id="txt-contact-email"
          label="E-Mail"
          value={email}
          onChange={(value: string) => dispatch(setEmail(value))}
        />
        <TextInput
          id="txt-contact-message"
          label="Message"
          type="textarea"
          value={message}
          onChange={(value: string) => dispatch(setMessage(value))}
        />
        <Button
          text="Submit"
          icon="PaperAirplaneIcon"
          className="mt-4"
          disabled={name.length === 0 || email.length === 0 || message.length === 0}
          onClick={() => dispatch(sendMessage())}
        />
      </div>
    </Card>
  );
}
