"use client";

import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import React from "react";

// Extending the props from React.InputHTMLAttributes<HTMLInputElement>
interface StylizedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean;
}

export const StylizedInput: React.FC<StylizedInputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  if (!isPassword) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`rounded border-2 border-gray-300/60 p-2 outline-none transition-all hover:border-blue-300 focus:border-blue-300 ${className}`}
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
        className={`rounded border-2 border-gray-300/60 p-2 outline-none transition-all hover:border-blue-300 focus:border-blue-300 ${className}`}
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
