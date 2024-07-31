"use client";

import { Suspense, useState } from "react";
import ActionButton from "@/components/ActionButton";
import { StylizedInput } from "@/components/StylizedInput";
import {
  recoverPassword,
  sendResetPasswordEmail,
} from "@/services/authService";
import { CredentialsPageProps } from "@/types/interfaces";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <SuspenseWrapper />
    </Suspense>
  );
}

const SuspenseWrapper = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  if (!userId || !secret) {
    return <NoCredentialsPage />;
  }

  return <CredentialsPage userId={userId} secret={secret} />;
};

const NoCredentialsPage = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await sendResetPasswordEmail(value);
    setIsLoading(false);
    setIsSent(true);
  };

  return (
    <main className="flex w-full flex-grow flex-col items-center justify-start gap-2">
      <h1 className="header mb-5 mt-10">Forgot your password?</h1>
      <p className="text-nunito max-w-[60ch] text-center text-xl text-slate-700 dark:text-slate-200">
        {
          "Don't worry, we'll send you a link to reset your password. You'll just need to enter your email address."
        }
      </p>
      <StylizedInput
        type="email"
        placeholder="Email"
        variant="ghost"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="!mt-20 min-w-64"
      />

      <ActionButton
        onClick={handleSubmit}
        variant="accent"
        className={`mt-10 !text-4xl ${isLoading ? "opacity-50" : ""}`}
      >
        {isLoading && !isSent ? "Sending..." : "Send Link"}
        {isLoading && <FaSpinner className="animate-spin" />}
      </ActionButton>
      {isSent && (
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          {
            "Link sent! if you don't receive it, check your spam folder or click here to resend it. "
          }
          <span onClick={handleSubmit} className="underline">
            Resend link
          </span>
        </p>
      )}
    </main>
  );
};

const CredentialsPage = ({ userId, secret }: CredentialsPageProps) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async () => {
    try {
      setIsLoading(true);
      await recoverPassword({ userId, secret, password: value });
      router.push("/");
    } catch (err) {
      console.log("Error", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex w-full flex-grow flex-col items-center justify-start gap-2">
      <h1 className="header mb-5 mt-10 text-center">
        Now you just need to enter your new password
      </h1>
      <StylizedInput
        type="password"
        placeholder="Password"
        variant="ghost"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <ActionButton
        onClick={handleUpdatePassword}
        variant="accent"
        className={`mt-10 !text-4xl ${isLoading ? "opacity-50" : ""}`}
      >
        Update Password
        {isLoading && <FaSpinner className="animate-spin" />}
      </ActionButton>
    </main>
  );
};
