export default function ActionButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center font-nunito justify-center gap-5 rounded bg-blue-500 p-2 text-lg text-white shadow-lg shadow-transparent transition-all hover:shadow-blue-500/70 ${className}`}
    >
    {children}
    </button>
  );
}