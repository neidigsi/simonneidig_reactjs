import clsx from "clsx";
import { JSX } from "react";

interface InputLabelProps {
  htmlFor: string;
  shouldFloat: boolean;
  label: string;
}

/**
 * InputLabel component that renders a floating label for an input field.
 * The component is used by all input components to provide a consistent label style.
 *
 * @author Simon Neidig <mail@simonneidig.de>
 * @param {Object} props - The properties object.
 * @param {string} props.htmlFor - The ID of the input element this label is associated with.
 * @param {boolean} props.shouldFloat - Determines whether the label should float above the input.
 * @param {string} props.label - The text to display as the label.
 * @returns {JSX.Element} The rendered label component.
 */
export default function InputLabel({
  htmlFor,
  shouldFloat,
  label,
}: Readonly<InputLabelProps>): JSX.Element {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        "absolute left-0 top-2 text-sm text-black dark:text-white transition-all duration-200 ease-in-out",
        shouldFloat ? "translate-y-0 scale-90" : "translate-y-6 scale-100"
      )}
    >
      {label}
    </label>
  );
}
