import InvalidCredentialLogin from "@/components/InvalidCredential";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

type LoginInputGroupProps = {
  isInvalidCredential: boolean;
  passwordVisible: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  togglePasswordVisibility: () => void;
  handleLogin: () => void;
};

const LoginInputGroup = ({
  isInvalidCredential,
  passwordVisible,
  setEmail,
  setPassword,
  setIsModalOpen,
  togglePasswordVisibility,
  handleLogin,
}: LoginInputGroupProps) => {
  return (
    <div className="mx-auto w-[400px] rounded-md bg-white p-5 shadow-lg shadow-slate-300">
      <div className="flex flex-col">
        {isInvalidCredential && <InvalidCredentialLogin />}
        {/* Email */}
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full rounded-sm border border-gray-200 px-4 py-3 text-lg shadow-sm outline-none focus:border-transparent focus:ring-1 focus:ring-[#0866FF]"
        />
        {/* Password */}
        <div className="relative mt-3">
          <input
            type={passwordVisible ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-sm border border-gray-200 px-4 py-3 text-lg  shadow-sm outline-none focus:border-transparent focus:ring-1 focus:ring-[#0866FF]"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 transform"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <EyeIcon className="h-5 w-5 text-gray-700" />
            ) : (
              <EyeSlashIcon className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Login */}
        <button
          onClick={handleLogin}
          className="mt-5 w-full rounded-md bg-[#0866FF] py-2 text-2xl font-semibold text-white hover:bg-[#1877F2]"
        >
          Log in
        </button>

        {/* Forgotten password */}
        <p className="text-md mt-5 cursor-pointer text-center text-[#0866FF] hover:underline">
          Forgotten password ?
        </p>

        <hr className="my-6" />

        {/* Sign Up */}
        <div className="flex w-full justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-fit rounded-md bg-[#4fc238] px-4 py-3 text-lg font-semibold text-white hover:bg-[#36A420]"
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginInputGroup;
