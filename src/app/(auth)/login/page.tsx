"use client";

import { useState, useEffect } from "react";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { login } from "@/services/authService";
import { loginSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ActionButton from "@/components/ActionButton";
import { StylizedInput } from "@/components/StylizedInput";

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading } = useAuthenticatedUser();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const { email, password } = data;

    try {
      setIsLoading(true);
      await login({ email, password });
      router.push("/");
    } catch (err) {
      setError("Invalid email or password");
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-gray-500" />
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center gap-5">
      <h1 className="header">Login</h1>

      <form
        className="flex w-72 flex-col gap-3 rounded-md bg-slate-200 px-6 py-5 backdrop-blur-md dark:bg-slate-700"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="email"
            className="text-lg text-slate-700 dark:text-slate-200"
          >
            Email
          </label>
          <StylizedInput
            type="email"
            variant="secondary"
            placeholder="Your beautiful email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="password"
            className="text-lg text-slate-700 dark:text-slate-200"
          >
            Password
          </label>
          <StylizedInput
            type="password"
            variant="secondary"
            placeholder="Your awesome password"
            {...register("password")}
          />

          <Link
            className="text-sm text-slate-500 transition-colors hover:text-blue-500 dark:text-slate-200 dark:hover:text-blue-300"
            href="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <ActionButton
          onClick={handleSubmit(onSubmit)}
          variant="primary"
          className={`mt-5 ${isLoading ? "opacity-50" : ""}`}
        >
          Login
          {isLoading && <FaSpinner className="animate-spin" />}
        </ActionButton>
      </form>
      <p className="flex items-center gap-2 text-left text-sm text-slate-600 dark:text-slate-400">
        {"Don't have an account? "}
        <Link
          href="/register"
          className="text-slate-400 transition-colors hover:text-blue-500 dark:text-slate-200 dark:hover:text-blue-300"
        >
          Register here
        </Link>
      </p>
    </main>
  );
}
