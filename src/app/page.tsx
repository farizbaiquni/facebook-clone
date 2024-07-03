"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import SignUpModal from "@/components/homepage/signup/SignUpModal";

import AlertMessageTopRight from "@/components/AlertMessageTopRight";
import LoginInputGroup from "./login/_components/LoginInputGroup";
import { ErrorStatusEnum } from "@/types/responses";

export enum AlertFailedSignupEnum {
  INVALID_INPUT = "INVALID_INPUT",
  EMAIL_ALREADY_EXIST = "EMAIL_ALREADY_EXIST",
  SERVER_ERROR = "SERVER_ERROR",
}

export type ShowAlertSignupType = {
  isAlertSuccess: boolean;
  failedSignupEnum?: AlertFailedSignupEnum;
};

export default function Home() {
  const alertDuration = 3000;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAlertFailedLogin, setIsAlertFailedLogin] = useState(false);
  const [isAlertFailedSignupServer, setIsAlertFailedSignupServer] = useState(false);
  const [isAlertFailedSignupInvalidInput, setIsAlertFailedSignupInvalidInput] = useState(false);
  const [isAlertFailedSignupEmailAlreadyExist, setIsAlertFailedSignupEmailAlreadyExist] =
    useState(false);
  const [isAlertSucessSignup, setIsAlertSucessSignup] = useState(false);
  const [isInvalidCredential, setIsInvalidCredential] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const showAlertStatusSignup = (data: ShowAlertSignupType) => {
    if (data.isAlertSuccess) {
      setIsAlertSucessSignup(true);
      setTimeout(() => {
        setIsAlertSucessSignup(false);
        router.replace("/login");
      }, alertDuration);
    } else {
      switch (data.failedSignupEnum) {
        case AlertFailedSignupEnum.INVALID_INPUT:
          setIsAlertFailedSignupInvalidInput(true);
          setTimeout(() => {
            setIsAlertFailedSignupInvalidInput(false);
          }, alertDuration);
          break;
        case AlertFailedSignupEnum.EMAIL_ALREADY_EXIST:
          setIsAlertFailedSignupEmailAlreadyExist(true);
          setTimeout(() => {
            setIsAlertFailedSignupEmailAlreadyExist(false);
          }, alertDuration);
          break;
        case AlertFailedSignupEnum.SERVER_ERROR:
          setIsAlertFailedSignupServer(true);
          setTimeout(() => {
            setIsAlertFailedSignupServer(false);
          }, alertDuration);
          break;
      }
    }
  };

  const handleLogin = async () => {
    try {
      setIsAlertFailedLogin(false);
      setIsAlertSucessSignup(false);
      setIsAlertFailedSignupInvalidInput(false);
      setIsInvalidCredential(false);
      const response: any = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });
      if (response.data.status === "success") {
        router.replace("/dashboard");
      }
    } catch (error: AxiosError | any) {
      if (error.response?.data.status === ErrorStatusEnum.INVALID_PARAMETER) {
        setIsInvalidCredential(true);
      } else {
        setIsAlertFailedLogin(true);
        setTimeout(() => {
          setIsAlertFailedLogin(false);
        }, 1700);
      }
    }
  };

  return (
    <main className="flex h-screen items-center justify-center bg-[#F0F2F5]">
      <div className="flex w-4/5 max-lg:my-5 max-lg:w-[400px] max-lg:flex-col max-lg:items-center">
        <div className="flex flex-1 flex-col items-start max-lg:items-center">
          {/* Facebook title and description */}
          <span>
            <Image
              src="/facebook-text.svg"
              height={0}
              width={0}
              alt="facebook-text"
              className="h-[106px] w-[321px] lg:ml-[-35px]"
              priority
            />
            <p className="text-start text-3xl max-lg:text-center max-lg:text-2xl">
              Facebook helps you connect and share with the people in your life.
            </p>
          </span>

          {/* Disclaimer */}
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

        {/* Input login */}
        <div className="flex-1 flex-col max-lg:mt-3">
          <LoginInputGroup
            isInvalidCredential={isInvalidCredential}
            passwordVisible={passwordVisible}
            setEmail={setEmail}
            setPassword={setPassword}
            setIsModalOpen={setIsModalOpen}
            togglePasswordVisibility={togglePasswordVisibility}
            handleLogin={handleLogin}
          />
          <p className="mt-5 text-center">
            <b className=" cursor-pointer hover:underline">Create a Page</b> for a celebrity, brand
            or business.
          </p>
        </div>
      </div>

      {/* Alert failed login because of invalid credential */}
      {isAlertFailedLogin && (
        <AlertMessageTopRight
          topic="Unable to login"
          description="Please check your information and try again, if the problem continues please contact support for assistance."
          widthInPixel={500}
          bgTextBorderColor="border-red-600 bg-red-100 text-red-600"
          setIsAlert={setIsAlertFailedLogin}
        />
      )}

      {/* Alert failed signup because of invalid input */}
      {isAlertFailedSignupInvalidInput && (
        <AlertMessageTopRight
          topic="Unable to create an account"
          description="We were unable to create an account because of incorrect input. Please review your entries and try again."
          widthInPixel={500}
          bgTextBorderColor="border-red-600 bg-red-100 text-red-600"
          setIsAlert={setIsAlertFailedSignupInvalidInput}
        />
      )}

      {/* Alert failed signup because of email already exist */}
      {isAlertFailedSignupEmailAlreadyExist && (
        <AlertMessageTopRight
          topic="Unable to create an account"
          description="The email you entered is already registered. Please try again with a different email."
          widthInPixel={500}
          bgTextBorderColor="border-red-600 bg-red-100 text-red-600"
          setIsAlert={setIsAlertFailedSignupEmailAlreadyExist}
        />
      )}

      {/* Alert failed signup because of server error */}
      {isAlertFailedSignupServer && (
        <AlertMessageTopRight
          topic="Unable to create an account"
          description="An unexpected server error has occurred, causing signup to fail. Please try again later. If the issue persists, contact support."
          widthInPixel={500}
          bgTextBorderColor="border-red-600 bg-red-100 text-red-600"
          setIsAlert={setIsAlertFailedSignupServer}
        />
      )}

      {/* Alert success signup */}
      {isAlertSucessSignup && (
        <AlertMessageTopRight
          topic="You have been successfully registered"
          description="You will be redirected to the login page shortly..."
          bgTextBorderColor="border-green-600 bg-green-100 text-green-600"
          setIsAlert={setIsAlertSucessSignup}
        />
      )}

      <SignUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        showAlertStatusSignup={showAlertStatusSignup}
      />
    </main>
  );
}
