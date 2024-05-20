import { InputHTMLAttributes, useState } from "react";
import ExclamationCircleIcon from "../icons/ExclamationCircleIcon";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  onValidation?: (isValid: boolean) => void;
}

const InputField = ({
  label,
  error,
  onValidation,
  ...props
}: InputFieldProps) => {
  const [focused, setFocused] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    if (onValidation) {
      onValidation(e.target.value.trim() !== "");
    }
  };

  return (
    <div className="relative mb-3 w-full">
      <input
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        placeholder={label}
        className={`text-md peer w-full rounded-sm border border-gray-200 px-4 py-1 ${
          error ? "ring-1 ring-[#e8504d]" : ""
        } shadow-sm outline-none focus:border-transparent focus:ring-1 focus:ring-gray-300`}
      />
      {error && !focused && (
        <ExclamationCircleIcon className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-[#B94A48] peer-focus:hidden" />
      )}
    </div>
  );
};

export default InputField;
