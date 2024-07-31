"use client";

import { useState, useEffect } from "react";
import { register as registerUser } from "@/services/authService";
import { registerSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import ActionButton from "@/components/ActionButton";
import { StylizedInput } from "@/components/StylizedInput";

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const { user, loading: userLoading } = useAuthenticatedUser();

  useEffect(() => {
    if (!userLoading && user) {
      router.push("/");
    }
  }, [user, userLoading, router]);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    const { name, email, password } = data;

    try {
      setIsLoading(true);
      await registerUser({ name, email, password });
      router.push("/");
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-gray-500" />
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center gap-5">
      <h1 className="header">Register</h1>

      <form
        className="flex w-72 flex-col gap-6 rounded-md bg-slate-300/30 px-6 py-5 backdrop-blur-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="name"
            className="text-lg text-slate-700 dark:text-slate-200"
          >
            Name
          </label>
          <StylizedInput
            type="text"
            variant="secondary"
            placeholder="Your beautiful name"
            {...formRegister("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name?.message}</p>
          )}
        </div>

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
            placeholder="Your beautiful Email"
            {...formRegister("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email?.message}</p>
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
            placeholder="Your secret password"
            {...formRegister("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password?.message}</p>
          )}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <ActionButton
          onClick={handleSubmit(onSubmit)}
          variant="primary"
          className={`mt-5 ${isLoading ? "opacity-50" : ""}`}
        >
          Create your account!
          {isLoading && <FaSpinner className="animate-spin" />}
        </ActionButton>
      </form>

      <p className="flex items-center gap-2 text-left text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-slate-400 transition-colors hover:text-blue-500 dark:text-slate-200 dark:hover:text-blue-300"
        >
          Login here
        </Link>
      </p>
    </main>
  );
};

export default RegisterPage;
