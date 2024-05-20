import { useEffect, useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import RadioGroup from "./RadioGroup";
import {
  getDaysInMonth,
  generateYearOptions,
  generateMonthOptions,
} from "../../../utils/dateUtils";
import ExclamationCircleIcon from "../icons/ExclamationCircleIcon";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal = ({ isOpen, onClose }: SignUpModalProps) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentDay = new Date().getDate().toString();

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const [incorrectFirstName, setIncorrectFirstName] = useState(false);
  const [incorrectSurname, setIncorrectSurname] = useState(false);
  const [incorrectEmailOrPhone, setIncorrectEmailOrPhone] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [incorrectGender, setIncorrectGender] = useState(false);

  const [dateOfBirthDay, setDateOfBirthDay] = useState(currentDay);
  const [dateOfBirthMonth, setDateOfBirthMonth] = useState(currentMonth);
  const [dateOfBirthYear, setDateOfBirthYear] = useState(
    currentYear.toString(),
  );
  const [days, setDays] = useState<string[]>([]);
  const [showDateOfBirthError, setShowDateOfBirthError] = useState(false);

  useEffect(() => {
    setDays(getDaysInMonth(dateOfBirthYear, dateOfBirthMonth));
  }, [dateOfBirthYear, dateOfBirthMonth]);

  useEffect(() => {
    setDays(getDaysInMonth(currentYear.toString(), currentMonth));
  }, [currentMonth, currentYear]);

  const handleValidation =
    (setter: (value: boolean) => void) => (isValid: boolean) => {
      setter(!isValid);
    };

  const handleSignUp = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    let hasError = false;
    if (firstName.trim() === "") {
      setIncorrectFirstName(true);
      hasError = true;
    } else {
      setIncorrectFirstName(false);
    }

    if (surname.trim() === "") {
      setIncorrectSurname(true);
      hasError = true;
    } else {
      setIncorrectSurname(false);
    }

    if (emailOrPhone.trim() === "") {
      setIncorrectEmailOrPhone(true);
      hasError = true;
    } else {
      setIncorrectEmailOrPhone(false);
    }

    if (password.trim() === "") {
      setIncorrectPassword(true);
      hasError = true;
    } else {
      setIncorrectPassword(false);
    }

    if (!document.querySelector('input[name="gender"]:checked')) {
      setIncorrectGender(true);
      hasError = true;
    } else {
      setIncorrectGender(false);
    }

    const birthDate = new Date(
      `${dateOfBirthYear}-${dateOfBirthMonth}-${dateOfBirthDay}`,
    );
    const age = currentYear - birthDate.getFullYear();
    const isAgeValid = age > 5 || (age === 5 && new Date() >= birthDate);

    if (
      !dateOfBirthDay ||
      !dateOfBirthMonth ||
      !dateOfBirthYear ||
      !isAgeValid
    ) {
      setShowDateOfBirthError(true);
      hasError = true;
    } else {
      setShowDateOfBirthError(false);
    }

    // If there is an error, prevent sign up
    if (hasError) {
      return;
    }

    // Proceed with sign up logic
    console.log("Sign Up logic here...");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex min-w-max items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white px-5 py-6">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
          <button onClick={onClose} className="text-4xl text-gray-500">
            &times;
          </button>
        </div>

        <p className="mb-4 text-gray-500">Its quick and easy.</p>

        <hr className="my-3" />

        <form>
          <div className="flex space-x-3">
            {/* First name */}
            <InputField
              type="text"
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={incorrectFirstName}
              onValidation={handleValidation(setIncorrectFirstName)}
            />
            {/* Surname */}
            <InputField
              type="text"
              label="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              error={incorrectSurname}
              onValidation={handleValidation(setIncorrectSurname)}
            />
          </div>
          {/* Mobile number or email address */}
          <InputField
            type="text"
            label="Mobile number or email address"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            error={incorrectEmailOrPhone}
            onValidation={handleValidation(setIncorrectEmailOrPhone)}
          />
          {/* Password */}
          <InputField
            type="password"
            label="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={incorrectPassword}
            onValidation={handleValidation(setIncorrectPassword)}
          />

          <div className="mr-3 flex justify-between">
            <p className="text-xs text-gray-700">Gender</p>
            {showDateOfBirthError && (
              <ExclamationCircleIcon className="ml-2 h-6 w-6 self-center text-[#B94A48]" />
            )}
          </div>
          <div className="mb-3 flex space-x-3">
            <SelectField
              options={days.map((day) => ({ value: day, label: day }))}
              defaultValue={dateOfBirthDay}
              onChange={(e) => setDateOfBirthDay(e.target.value)}
              className="w-1/3"
              error={showDateOfBirthError}
            />
            <SelectField
              options={generateMonthOptions()}
              defaultValue={dateOfBirthMonth}
              onChange={(e) => setDateOfBirthMonth(e.target.value)}
              className="w-1/3"
              error={showDateOfBirthError}
            />
            <SelectField
              options={generateYearOptions(currentYear)}
              defaultValue={dateOfBirthYear}
              onChange={(e) => setDateOfBirthYear(e.target.value)}
              className="w-1/3"
              error={showDateOfBirthError}
            />
          </div>

          <div className="mr-3 flex justify-between">
            <p className="text-xs text-gray-700">Gender</p>
            {incorrectGender && (
              <ExclamationCircleIcon className="ml-2 h-6 w-6 self-center text-[#B94A48]" />
            )}
          </div>
          <RadioGroup
            options={[
              { value: "Female", label: "Female" },
              { value: "Male", label: "Male" },
            ]}
            name="gender"
            error={incorrectGender} // Pass error state to RadioGroup
          />

          <p className="mb-3 text-justify text-xs text-gray-500">
            People who use our service may have uploaded your contact
            information to Facebook.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Learn more
            </a>
            .
          </p>
          <p className="mb-3 text-justify text-xs text-gray-500">
            By clicking Sign Up, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms
            </a>
            ,{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Cookies Policy
            </a>
            . You may receive SMS notifications from us and can opt out at any
            time.
          </p>
          <div className="flex w-full justify-center">
            <button
              onClick={handleSignUp}
              className="rounded bg-green-600 px-14 py-1 text-xl font-bold text-white hover:bg-green-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;