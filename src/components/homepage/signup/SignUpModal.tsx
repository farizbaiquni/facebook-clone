import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import InputField from "./InputField";
import SelectField from "./SelectField";
import RadioGroup from "./RadioGroup";
import { GenderNumberEnum, GenderTextEnum, UserCreateType } from "@/types/user";
import {
  getDaysInMonth,
  generateYearOptions,
  generateMonthOptions,
  monthNameToIntMap,
} from "../../../utils/dateUtils";
import ExclamationCircleIcon from "../icons/ExclamationCircleIcon";
import { validateEmailFormat } from "@/utils/validations";
import Image from "next/image";

type ErrorValidationType = {
  field: string;
  isError: boolean;
};

type SignUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
  showAlertStatusSignup: (param: boolean) => void;
};

const SignUpModal = ({
  isOpen,
  onClose,
  showAlertStatusSignup,
}: SignUpModalProps) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentDay = new Date().getDate().toString();

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(GenderNumberEnum.MALE);

  const [dateOfBirthDay, setDateOfBirthDay] = useState(currentDay);
  const [dateOfBirthMonth, setDateOfBirthMonth] = useState(currentMonth);
  const [dateOfBirthYear, setDateOfBirthYear] = useState(
    currentYear.toString(),
  );
  const [days, setDays] = useState<string[]>([]);
  const [showDateOfBirthError, setShowDateOfBirthError] = useState(false);

  const [incorrectFirstName, setIncorrectFirstName] = useState(false);
  const [incorrectSurname, setIncorrectSurname] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [incorrectGender, setIncorrectGender] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleValidation =
    (setter: (value: boolean) => void) => (isValid: boolean) => {
      setter(!isValid);
    };

  const onChangeDateOfBirth = (year: number, month: number, day: number) => {
    const date = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
    setDateOfBirth(date);
  };

  const transformNameInput = (input: string): string => {
    return input.replace(/\b\w+\b/g, (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
  };

  const handleSignUpCallApi = async (
    userData: UserCreateType,
  ): Promise<void> => {
    try {
      const response = await axios.post("/api/auth/register", userData);
      setIsLoading(false);
      if (response.data.status === "success") {
        showAlertStatusSignup(true);
        onClose();
      } else {
        showAlertStatusSignup(false);
      }
    } catch (error) {
      onClose();
      setIsLoading(false);
    }
  };

  const validateRegisterationData = (
    firstName: string,
    surname: string,
    email: string,
    password: string,
    dateOfBirthDay: string,
    dateOfBirthMonth: string,
    dateOfBirthYear: string,
  ): ErrorValidationType[] => {
    const errors: ErrorValidationType[] = [];

    if (firstName.trim().length === 0) {
      errors.push({ field: "firstName", isError: true });
    } else {
      errors.push({ field: "firstName", isError: false });
    }

    if (surname.trim().length === 0) {
      errors.push({ field: "surname", isError: true });
    } else {
      errors.push({ field: "surname", isError: false });
    }

    if (email.trim().length === 0 || !validateEmailFormat(email.trim())) {
      errors.push({ field: "email", isError: true });
    } else {
      errors.push({ field: "email", isError: false });
    }

    if (password.trim().length === 0) {
      errors.push({ field: "password", isError: true });
    } else {
      errors.push({ field: "password", isError: false });
    }

    if (!document.querySelector('input[name="gender"]:checked')) {
      errors.push({ field: "gender", isError: true });
    } else {
      errors.push({ field: "gender", isError: false });
    }

    const birthDate = new Date(
      `${dateOfBirthYear}-${dateOfBirthMonth}-${dateOfBirthDay}`,
    );
    const age = new Date().getFullYear() - birthDate.getFullYear();
    const isAgeValid = age > 5 || (age === 5 && new Date() >= birthDate);

    if (
      !dateOfBirthDay ||
      !dateOfBirthMonth ||
      !dateOfBirthYear ||
      !isAgeValid
    ) {
      errors.push({ field: "dateOfBirth", isError: true });
    } else {
      errors.push({ field: "dateOfBirth", isError: false });
    }

    return errors;
  };

  const handleSignUp = async (
    firstName: string,
    surname: string,
    email: string,
    password: string,
    dateOfBirthDay: string,
    dateOfBirthMonth: string,
    dateOfBirthYear: string,
    gender: GenderNumberEnum,
  ) => {
    let hasError = false;

    const validationErrors: ErrorValidationType[] = validateRegisterationData(
      firstName,
      surname,
      email,
      password,
      dateOfBirthDay,
      dateOfBirthMonth,
      dateOfBirthYear,
    );

    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        const { field, isError } = error;
        if (isError) hasError = true;
        switch (field) {
          case "firstName":
            setIncorrectFirstName(isError);
            break;
          case "surname":
            setIncorrectSurname(isError);
            break;
          case "email":
            setIncorrectEmail(isError);
            break;
          case "password":
            setIncorrectPassword(isError);
            break;
          case "gender":
            setIncorrectGender(isError);
            break;
          case "dateOfBirth":
            if (isError) hasError = true;
            setShowDateOfBirthError(isError);
            break;
          default:
            break;
        }
      });
    }

    if (hasError) {
      setIsLoading(false);
      return;
    }

    const userCreateData: UserCreateType = {
      first_name: transformNameInput(firstName),
      last_name: transformNameInput(surname),
      email: "aaaaa",
      password: password,
      profile_picture: null,
      cover_photo: null,
      bio: null,
      birth_date: dateOfBirth,
      gender_id: gender,
    };

    // Proceed with sign up logic
    handleSignUpCallApi(userCreateData);
  };

  const handleOnClickSignUpButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setIsLoading(true);
    handleSignUp(
      firstName,
      surname,
      email,
      password,
      dateOfBirthDay,
      dateOfBirthMonth,
      dateOfBirthYear,
      gender,
    );
  };

  useEffect(() => {
    setDays(getDaysInMonth(dateOfBirthYear, dateOfBirthMonth));
  }, [dateOfBirthYear, dateOfBirthMonth]);

  useEffect(() => {
    setDays(getDaysInMonth(currentYear.toString(), currentMonth));
  }, [currentMonth, currentYear]);

  useEffect(() => {
    onChangeDateOfBirth(
      parseInt(dateOfBirthYear),
      monthNameToIntMap.get(dateOfBirthMonth.toLocaleLowerCase()) ?? 0,
      parseInt(dateOfBirthDay),
    );
  }, [dateOfBirthDay, dateOfBirthMonth, dateOfBirthYear]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex min-w-max items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white px-5 py-6">
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
            label="Email address"
            autoComplete="on"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={incorrectEmail}
            onValidation={handleValidation(setIncorrectEmail)}
          />

          {/* Password */}
          <InputField
            type="password"
            label="New password"
            autoComplete="on"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={incorrectPassword}
            onValidation={handleValidation(setIncorrectPassword)}
          />

          <div className="mr-3 flex justify-between">
            <p className="text-xs text-gray-700">Date of birth</p>
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
              { value: GenderTextEnum.MALE, label: GenderTextEnum.MALE },
              { value: GenderTextEnum.FEMALE, label: GenderTextEnum.FEMALE },
            ]}
            name="gender"
            error={incorrectGender}
            gender={gender}
            setGender={setGender}
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
              onClick={handleOnClickSignUpButton}
              className="rounded bg-green-600 px-14 py-1 text-xl font-bold text-white hover:bg-green-500"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Loading resgistering... */}
        {isLoading && (
          <div
            className={`absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center rounded-lg bg-black bg-opacity-45`}
          >
            <Image
              alt="processing"
              width={45}
              height={45}
              src={"/gifs/loading.gif"}
            />
            <p className="mt-3 font-semibold text-slate-300">
              Process registering...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpModal;
