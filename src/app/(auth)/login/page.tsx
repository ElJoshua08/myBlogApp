"use client";
import { useState } from "react";
import { login } from "@/services/authService";
import { loginSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    console.log("loginIn button clicked");

    try {
      setIsLoading(true);

      await login(data.email, data.password);

      console.log("Logged in");

      // Handle successful login
    } catch (err) {
      setError("Invalid email or password");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-20 bg-gray-900 p-2">
      <h1 className="font-pacifico text-4xl font-semibold text-white">Login</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="rounded border border-gray-300 p-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className="rounded border border-gray-300 p-2"
          />
          {showPassword ? (
            <FaEye
              className="absolute right-2 top-[50%] size-6 translate-y-[-50%] cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEyeSlash
              className="absolute right-2 top-[50%] size-6 translate-y-[-50%] cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className={`flex items-center justify-center gap-5 rounded bg-blue-500 p-2 text-white ${isLoading ? "opacity-50" : ""}`}
          disabled={isLoading}
        >
          Login
          {isLoading && <FaSpinner className="animate-spin" />}
        </button>
      </form>
      <p className="flex items-center gap-2 text-gray-600">
        Dont have an account?{" "}
        <Link
          href="/register"
          className="text-gray-300 transition-colors hover:text-blue-300"
        >
          Register here
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
