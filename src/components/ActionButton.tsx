import React from "react";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonType?: "primary" | "secondary";
  onClick: () => void;
  className?: string;
}

export default function ActionButton({
  children,
  onClick,
  className = "",
  buttonType = "primary",
  ...props
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center gap-5 rounded bg-blue-500 p-2 font-nunito text-lg text-white shadow-lg shadow-transparent transition-all hover:shadow-blue-500/70 ${className} ${buttonType === "primary" && "hover:bg-blue-400"} ${buttonType === "secondary" && "hover:bg-slate-200 dark:hover:bg-slate-700"}`}
      {...props}
    >
      {children}
    </button>
  );
}
