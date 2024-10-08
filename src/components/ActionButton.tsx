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
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary:
      "text-slate-700 bg-white shadow-sm hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500",
    accent: "bg-accent text-white hover:bg-accent-dark",
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
