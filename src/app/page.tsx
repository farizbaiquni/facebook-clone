"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import SignUpModal from "@/components/homepage/signup/SignUpModal";

import AlertMessageTopRight from "@/components/alerts/AlertMessageTopRight";
import LoginInputGroup from "./login/_components/LoginInputGroup";
import { ErrorStatusEnum } from "@/types/responses";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAlertFailedLogin, setIsAlertFailedLogin] = useState(false);
  const [isAlertFailedSignup, setIsAlertFailedSignup] = useState(false);
  const [isAlertSucessSignup, setIsAlertSucessSignup] = useState(false);
  const [isInvalidCredential, setIsInvalidCredential] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const showAlertStatusSignup = (isAlertSuccess: boolean) => {
    if (isAlertSuccess) {
      setIsAlertFailedSignup(false);
      setIsAlertSucessSignup(true);
      setIsAlertSucessSignup(true);
      setTimeout(() => {
        setIsAlertSucessSignup(false);
        router.replace("/login");
      }, 1500);
    } else {
      setIsAlertSucessSignup(false);
      setIsAlertFailedSignup(true);
      setTimeout(() => {
        setIsAlertFailedSignup(false);
      }, 1200);
    }
  };

  const handleLogin = async () => {
    try {
      setIsAlertFailedLogin(false);
      setIsAlertSucessSignup(false);
      setIsAlertFailedSignup(false);
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
            <b className=" cursor-pointer hover:underline">Create a Page</b> for
            a celebrity, brand or business.
          </p>
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

      {isAlertFailedSignup && (
        <AlertMessageTopRight
          topic="Unable to create an account"
          description="Please check your information and try again, if the problem continues please contact support for assistance."
          widthInPixel={500}
          bgTextBorderColor="border-red-600 bg-red-100 text-red-600"
          setIsAlert={setIsAlertFailedSignup}
        />
      )}

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
