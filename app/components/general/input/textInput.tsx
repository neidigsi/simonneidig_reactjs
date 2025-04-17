import { useState } from 'react';
import clsx from 'clsx';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
  type?: string;
}

export default function TextInput({
  label,
  value,
  onChange,
  id = 'text-input',
  type = 'text',
}: Readonly<TextInputProps>) {
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
      <label
        htmlFor={id}
        className={clsx(
          'absolute left-0 top-2 text-sm text-black dark:text-white transition-all duration-200 ease-in-out',
          shouldFloat
            ? 'translate-y-0 scale-90'
            : 'translate-y-6 scale-100'
        )}
      >
        {label}
      </label>
    </div>
  );
}