"use client";
import { useState } from "react";
import { register } from "@/services/authService";
import { registerSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import ActionButton from "@/components/ActionButton";

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const user = useAuthenticatedUser();

  if (user) {
    router.push("/");
  }

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
      await register({ name, email, password });

      router.push("/");
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center gap-5">
      <h1 className="header">
        Register
      </h1>

      <form
        className="flex w-72 flex-col gap-6 rounded-md bg-slate-300/30 px-6 py-5 backdrop-blur-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Name"
          {...formRegister("name")}
          className="rounded border-2 border-gray-300/60 p-2 outline-none transition-all hover:border-blue-300 focus:border-blue-300"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...formRegister("email")}
          className="rounded border-2 border-gray-300/60 p-2 outline-none transition-all hover:border-blue-300 focus:border-blue-300"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...formRegister("password")}
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
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        {error && <p className="text-red-500">{error}</p>}

        <ActionButton
          onClick={handleSubmit(onSubmit)}
          className={isLoading ? "opacity-50" : ""}
        >
          Create your account!
          {isLoading && <FaSpinner className="animate-spin" />}
        </ActionButton>
      </form>

      <p className="flex items-center gap-2 text-left text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-gray-400 transition-colors hover:text-blue-500"
        >
          Login here
        </Link>
      </p>
    </main>
  );
};

export default RegisterPage;
