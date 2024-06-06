"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="h-screen justify-center bg-[#F0F2F5]">
      <div className="flex h-full flex-col items-center justify-center">
        <Image
          src="/facebook-text.svg"
          height={0}
          width={0}
          alt="facebook-text"
          className="h-[79px] w-[240px] lg:ml-[-35px]"
          priority
        />
        {/* Card Login */}
        <div className="flex w-[395px] flex-col items-center rounded-md border border-gray-300 bg-white font-[Helvetica] shadow-md">
          <div className="flex w-full flex-col items-center px-5 pt-5">
            <p className="pb-5 text-lg">Log in to Facebook</p>
            {/* Input */}
            <input
              type="text"
              placeholder="Email address"
              className="mb-3 w-full rounded-md border border-gray-300 p-3 text-lg outline-none"
            />
            {/* Password */}
            <div className="relative mb-3 w-full">
              <input
                type={passwordVisible ? "text" : "password"}
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
            <button className="w-full rounded-md bg-[#1877f2] py-2 text-lg font-semibold text-white">
              Log In
            </button>
            <p className="mt-3 text-sm text-[#1877f2]">Forgotten account?</p>
          </div>
          <div className="flex w-full items-center px-2 py-2">
            <hr className="w-full border border-gray-200" />
            <p className="px-3 text-sm text-[#96999e]">or</p>
            <hr className="w-full border border-gray-200" />
          </div>
          <button className="mb-5 rounded-md bg-[#36a420] p-2 text-[17px] text-lg font-semibold text-white">
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
}
