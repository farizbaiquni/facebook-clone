import { Fragment } from "react";
import { GenderNumberEnum, GenderTextEnum } from "@/types/users";

type Option = {
  value: GenderTextEnum;
  label: GenderTextEnum;
};

type RadioGroupProps = {
  options: Option[];
  name: string;
  className?: string;
  error?: boolean;
  gender: GenderNumberEnum;
  setGender: (param: GenderNumberEnum) => void;
};

const RadioGroup = ({
  options,
  name,
  className,
  error,
  gender,
  setGender,
}: RadioGroupProps) => {
  const handlerChangeGenderTextToGenderEnum = (
    genderText: GenderTextEnum,
  ): GenderNumberEnum => {
    if (genderText === GenderTextEnum.MALE) {
      return GenderNumberEnum.MALE;
    } else if (genderText === GenderTextEnum.FEMALE) {
      return GenderNumberEnum.FEMALE;
    } else {
      return GenderNumberEnum.MALE;
    }
  };

  const handleOnClickGenderRadio = (gender: GenderTextEnum) => {
    const genderNumberEnum: GenderNumberEnum =
      handlerChangeGenderTextToGenderEnum(gender);
    setGender(genderNumberEnum);
  };
  return (
    <Fragment>
      <div className={`mb-3 flex space-x-3 ${className}`}>
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => handleOnClickGenderRadio(option.value)}
            className={`w-1/2 rounded border border-gray-300 px-2 py-2 ${error ? "ring-1 ring-[#B94A48]" : ""}`}
          >
            <label className="flex justify-between text-sm">
              {option.label}
              <input
                onChange={() => handleOnClickGenderRadio(option.value)}
                type="radio"
                name={name}
                value={option.value}
                className="ml-2"
                checked={
                  gender === handlerChangeGenderTextToGenderEnum(option.value)
                }
              />
            </label>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default RadioGroup;
