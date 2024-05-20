import { Fragment } from "react";
import ExclamationCircleIcon from "../icons/ExclamationCircleIcon";

interface Option {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: Option[];
  name: string;
  className?: string;
  error?: boolean; // Added error prop
}

const RadioGroup = ({ options, name, className, error }: RadioGroupProps) => {
  return (
    <Fragment>
      <div className={`mb-3 flex space-x-3 ${className}`}>
        {options.map((option) => (
          <div
            key={option.value}
            className={`w-1/2 rounded border border-gray-300 px-2 py-2 ${error ? "ring-1 ring-[#B94A48]" : ""}`}
          >
            <label className="flex justify-between text-sm">
              {option.label}
              <input
                type="radio"
                name={name}
                value={option.value}
                className="ml-2"
              />
            </label>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default RadioGroup;
