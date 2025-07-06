import { JSX, useState } from "react";
import InputLabel from "./inputLabel";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
  type?: string;
}

/**
 * TextInput component that renders a styled text input with a floating label.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.label - The label text for the text input.
 * @param {string} props.value - The current value of the text input.
 * @param {(value: string) => void} props.onChange - The function to call when the value changes.
 * @param {string} [props.id="text-input"] - The unique ID for the text input.
 * 
 * @returns {JSX.Element} The rendered text input input component.
 */
export default function TextInput({
  label,
  value,
  onChange,
  id = "text-input",
  type = "text",
}: Readonly<TextInputProps>): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);

  const shouldFloat = isFocused || value.length > 0;

  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full border-0 border-b-2 border-light-grey bg-transparent px-0 pt-7 pb-2 text-base text-black dark:text-white placeholder-transparent focus:border-primary/20 dark:focus:border-primary/60 focus:outline-none"
        placeholder={label}
      />
      <InputLabel htmlFor={id} shouldFloat={shouldFloat} label={label} />
    </div>
  );
}
