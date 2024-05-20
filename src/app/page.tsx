"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import SignUpModal from "@/components/homepage/signup/SignUpModal";

export default function Home() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <main className="flex h-screen items-center justify-center bg-[#F0F2F5]">
      <div className="flex w-4/5 max-lg:my-5 max-lg:w-[400px] max-lg:flex-col max-lg:items-center">
        <div className="flex flex-1 flex-col items-start max-lg:items-center">
          <Image
            src="/facebook-text.svg"
            height={350}
            width={350}
            alt="facebook-text"
            className="lg:ml-[-35px]"
          />
          <p className="text-start text-3xl max-lg:text-center max-lg:text-2xl">
            Facebook helps you connect and share with the people in your life.
          </p>

          <div className="mt-10 max-lg:mt-2 max-lg:text-center">
            <p className="font-semibold text-red-500">
              * Clone version for educational purposes only.
            </p>
            <p className="cursor-pointer underline hover:underline">
              <Link
                href="https://github.com/farizbaiquni"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/farizbaiquni
              </Link>
            </p>
          </div>
        </div>
        <div className="flex-1 flex-col max-lg:mt-3">
          <div className="mx-auto w-[400px] rounded-md bg-white p-5 shadow-lg shadow-slate-300">
            <div className="flex flex-col">
              {/* Email */}
              <input
                type="text"
                placeholder="Email address"
                className="w-full rounded-sm border border-gray-200 px-4 py-3 text-lg shadow-sm
                outline-none focus:border-transparent focus:ring-1 focus:ring-[#0866FF]"
              />
              {/* Password */}
              <div className="relative mt-3">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  className="w-full rounded-sm border border-gray-200 px-4 py-3 text-lg 
                  shadow-sm outline-none focus:border-transparent focus:ring-1 focus:ring-[#0866FF]"
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
              <button className="mt-5 w-full rounded-md bg-[#0866FF] py-2 text-2xl font-semibold text-white hover:bg-[#1877F2]">
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
          <p className="mt-5 text-center">
            <b className=" cursor-pointer hover:underline">Create a Page</b> for
            a celebrity, brand or business.
          </p>
        </div>
      </div>
      <SignUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
