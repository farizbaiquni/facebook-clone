interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  options: Option[];
  defaultValue: string;
  className?: string;
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField = ({
  options,
  defaultValue,
  className,
  error,
  onChange,
}: SelectFieldProps) => {
  return (
    <div className={`relative mb-3 w-full ${className}`}>
      <select
        defaultValue={defaultValue}
        onChange={onChange}
        className={`peer w-full rounded border border-gray-200 py-2 text-sm shadow-sm outline-none focus:border-transparent focus:ring-1 focus:ring-gray-300 ${
          error ? "ring-1 ring-[#B94A48]" : ""
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
