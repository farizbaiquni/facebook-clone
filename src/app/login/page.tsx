"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import InvalidCredentialLogin from "@/components/InvalidCredential";
import axios from "axios";
import { ErrorStatusEnum } from "@/types/responses";
import AlertMessageTopRight from "@/components/alerts/AlertMessageTopRight";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isInvalidCredential, setIsInvalidCredential] = useState(false);
  const [isAlertFailedLogin, setIsAlertFailedLogin] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    try {
      setIsInvalidCredential(false);
      const response: any = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });
      if (response.data.status === "success") {
        router.replace("/dashboard");
      } else {
        if (response.data.status === ErrorStatusEnum.INVALID_PARAMETER) {
          setIsInvalidCredential(true);
        } else {
          setIsAlertFailedLogin(true);
          setTimeout(() => {
            setIsAlertFailedLogin(false);
          }, 1200);
        }
      }
    } catch (error) {
      setIsInvalidCredential(true);
    }
  };

  const handleRedirectHomepage = () => {
    router.push("/");
  };

  return (
    <main className="h-screen justify-center bg-[#F0F2F5]">
      <div className="flex h-full flex-col items-center justify-center">
        <Image
          src="/facebook-text.svg"
          height={0}
          width={0}
          alt="facebook-text"
          className="bg-red-700] h-[79px] w-[240px]"
          priority
        />

        {/* Card Login */}
        <div className="flex w-[395px] flex-col items-center rounded-md border border-gray-300 bg-white font-[Helvetica] shadow-md">
          <div className="flex w-full flex-col items-center px-5 pt-5">
            <p className="pb-5 text-lg">Log in to Facebook</p>

            {isInvalidCredential && <InvalidCredentialLogin />}

            {/* Input Email*/}
            <input
              type="text"
              value={email}
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3 w-full rounded-md border border-gray-300 p-3 text-lg outline-none"
            />

            {/* Input Password */}
            <div className="relative mb-3 w-full">
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-3 text-lg outline-none"
              />
              <button
                type="button"
                className={`absolute right-3 top-1/2 -translate-y-1/2 transform ${password.length <= 0 && "hidden"}`}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <EyeIcon className="h-5 w-5 text-gray-700" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5 text-gray-700" />
                )}
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full rounded-md bg-[#1877f2] py-2 text-lg font-semibold text-white"
            >
              Log In
            </button>

            <p className="mt-3 text-sm text-[#1877f2]">Forgotten account?</p>
          </div>

          {/* OR */}
          <div className="flex w-full items-center px-2 py-2">
            <hr className="w-full border border-gray-200" />
            <p className="px-3 text-sm text-[#96999e]">or</p>
            <hr className="w-full border border-gray-200" />
          </div>

          <button
            onClick={handleRedirectHomepage}
            className="mb-5 rounded-md bg-[#36a420] p-2 text-[17px] text-lg font-semibold text-white"
          >
            Create new account
          </button>
        </div>
      </div>
      {isAlertFailedLogin && (
        <AlertMessageTopRight
          topic="Unable to login"
          description="Please check your information and try again, if the problem continues please contact support for assistance."
          widthInPixel={500}
          bgTextBorderColor="border-red-600 bg-red-100 text-red-600"
          setIsAlert={setIsAlertFailedLogin}
        />
      )}
    </main>
  );
}
