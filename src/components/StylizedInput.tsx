"use client";

import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import React from "react";

// Extending the props from React.InputHTMLAttributes<HTMLInputElement>
interface StylizedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean;
  variant?: "primary" | "secondary" | "accent" | "error" | "ghost";
}

export const StylizedInput: React.FC<StylizedInputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  variant = "primary",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  // Define variant styles
  const variantStyles: { [key: string]: string } = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-400",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 dark:bg-gray-400",
    accent: "bg-green-500 text-white hover:bg-green-600 dark:bg-green-400",
    error: "bg-red-800/70 text-white hover:bg-red-600 dark:bg-red-400",
    ghost:
      "bg-200/70 dark:bg-gray-800/70 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
  };

  const inputClasses = `rounded border-2 border-gray-300/60 p-2 outline-none transition-all ${className} ${variantStyles[variant]}`;

  if (!isPassword) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClasses}
        {...props}
      />
    );
  }

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClasses}
        {...props}
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
  );
};
