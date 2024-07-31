import React from "react";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "error" | "ghost";
  onClick: () => void;
  className?: string;
}

export default function ActionButton({
  children,
  onClick,
  className,
  variant = "primary",
  ...props
}: ActionButtonProps) {
  // Define variant styles
  const buttonStyles: { [key: string]: string } = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-400 dark:bg-blue-400 dark:hover:bg-blue-300",
    secondary:
      "bg-gray-500 text-white hover:bg-gray-400 dark:bg-gray-400 dark:hover:bg-gray-300",
    accent:
      "bg-green-500 text-white hover:bg-green-400 dark:bg-green-400 dark:hover:bg-green-300",
    error:
      "bg-red-500/60 border-red-500 border-2  text-white hover:bg-red-400 dark:bg-red-800/70 dark:hover:bg-red-700",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
  };

  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center gap-5 rounded p-2 font-nunito text-lg shadow-lg transition-all ${className} ${buttonStyles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
