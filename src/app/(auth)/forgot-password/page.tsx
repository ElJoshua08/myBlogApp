"use client";

import {
  recoverPassword,
  sendResetPasswordEmail,
} from "@/services/authService";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  const [emailValue, setemailValue] = useState("josuealejandrof926@gmail.com");
  const [passwordValue, setPasswordValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async () => {
    await sendResetPasswordEmail(emailValue);
  };

  const handleUpdatePassword = async () => {
    await recoverPassword(userId!, secret!, passwordValue);
    router.push("/");
  };

  console.log("userId", userId);
  console.log("secret", secret);

  if (userId && secret) {
    return (
      <main className="flex flex-col items-center justify-center gap-5">
        <h1 className="header">Enter your new password</h1>
        <div className="relative">
          <input
            type={isVisible ? "text" : "password"}
            placeholder="Password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          {isVisible ? (
            <FaEyeSlash
              className="absolute right-2 top-[50%] size-6 translate-y-[-50%] cursor-pointer text-gray-400"
              onClick={() => setIsVisible(!isVisible)}
            />
          ) : (
            <FaEye
              className="absolute right-2 top-[50%] size-6 translate-y-[-50%] cursor-pointer text-gray-400"
              onClick={() => setIsVisible(!isVisible)}
            />
          )}
        </div>

        <button
          className="mt-5 flex items-center justify-center gap-3 rounded-md bg-accent px-3 py-2 text-xl text-gray-100 transition-colors hover:bg-accent/70 hover:text-white"
          onClick={handleUpdatePassword}
        >
          Update Password
        </button>
      </main>
    );
  }
  return (
    <main className="flex flex-col items-center justify-center gap-5">
      <h1 className="header">Forgot Password</h1>
      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        Enter your email address and we will send you a link to reset your
        password.
      </p>
      <input
        type="email"
        placeholder="Email"
        value={emailValue}
        onChange={(e) => setemailValue(e.target.value)}
      />

      <button
        className="mt-5 flex items-center justify-center gap-3 rounded-md bg-accent px-3 py-2 text-xl text-gray-100 transition-colors hover:bg-accent/70 hover:text-white"
        onClick={handleSubmit}
      >
        Send Link
      </button>
    </main>
  );
}
