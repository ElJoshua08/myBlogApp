"use client";
import {  useState } from "react";
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

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const user = useAuthenticatedUser();

  if (user) {
    router.push("/"); 
  }


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);

      router.push("/");
    } catch (err) {
      setError("Invalid email or password");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center gap-5">
      <h1 className="mb-12 font-pacifico text-7xl font-semibold text-purple-300 shadow-purple-900 drop-shadow-md">
        Login
      </h1>

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

        <button
          type="submit"
          className={`flex items-center justify-center gap-5 rounded bg-blue-500 p-2 text-lg text-white shadow-lg shadow-transparent transition-all hover:shadow-blue-500/70 ${isLoading ? "opacity-50" : ""}`}
          disabled={isLoading}
        >
          Login
          {isLoading && <FaSpinner className="animate-spin" />}
        </button>
      </form>
      <p className="flex items-center gap-2 text-left text-sm text-gray-600">
        Dont have an account?{" "}
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

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  className: string;
}

export default LoginPage;
