"use client";
import { useState } from "react";
import { register as registerService } from "@/services/authService";
import { registerSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      const user =await registerService(name, email, password);
      console.log(user);
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-20 bg-gray-900 p-2">
      <h1 className="font-pacifico text-4xl font-semibold text-white">
        Register
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          {...formRegister("name")}
          className="rounded border border-gray-300 p-2"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...formRegister("email")}
          className="rounded border border-gray-300 p-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...formRegister("password")}
          className="rounded border border-gray-300 p-2"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className={`rounded bg-blue-500 p-2 text-white ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={isLoading}
        >
          Create your account!
        </button>
      </form>

      <p className="flex items-center gap-2 text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-gray-300 transition-colors hover:text-blue-300"
        >
          Login here
        </Link>
      </p>
    </main>
  );
};

export default RegisterPage;
