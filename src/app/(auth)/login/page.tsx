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
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import ActionButton from "@/components/ActionButton";

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        className="flex w-72 flex-col gap-3 rounded-md bg-slate-200/30 px-6 py-5 backdrop-blur-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="email">Email</label>

          <input
            type="email"
            placeholder="Your beautiful email"
            id="email"
            {...register("email")}
            className="rounded border-2 border-gray-300/60 p-2 outline-none transition-all hover:border-blue-300 focus:border-blue-300"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="relative flex w-full flex-col gap-1">
          <label htmlFor="password">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your awesome password"
              id="password"
              {...register("password")}
              className="w-full rounded border-2 border-gray-300/60 p-2 outline-none transition-all hover:border-blue-300 focus:border-blue-300"
            />
            {showPassword ? (
              <FaRegEye
                className="absolute right-2 top-[50%] size-6 translate-y-[-50%] cursor-pointer text-blue-300"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute right-2 top-[50%] size-6 translate-y-[-50%] cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              />
          )}
          </div>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <ActionButton
          onClick={handleSubmit(onSubmit)}
          className={`mt-5 ${isLoading ? "opacity-50" : ""}`}
        >
          Login
          {isLoading && <FaSpinner className="animate-spin" />}
        </ActionButton>
      </form>
      <p className="flex items-center gap-2 text-left text-sm text-gray-600">
        {"Don't have an account? "}
        <Link
          href="/register"
          className="text-gray-400 transition-colors hover:text-blue-500"
        >
          Register here
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
