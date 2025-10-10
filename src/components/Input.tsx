import { type InputHTMLAttributes, type ReactNode, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  icon?: ReactNode;
  label?: string;
  error?: string;
  id?: string;
  className?: string;
}

const Input = ({ icon, fullWidth, label, error, id, className, ...rest }: InputProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`${fullWidth ? "w-full" : ""} mb-4`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-50 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute top-4 left-3 pl-1 flex items-center cursor-pointer text-gray-400">
            {icon}
          </div>
        )}
      </div>
      <input
        type="text"
        id={inputId}
        className={`block pl-10 w-full rounded-xl border ${error ? "border-red-500" : "border-gray-700"} bg-gray-700 px-4 py-3 text-sm text-gray-50 transition-all focus:outline-none focus:ring-2
            ${error ? "focus:border-red-500 focus:ring-red-500/2" : "focus:border-primary-500 focus:ring-red-500/2"}
            ${icon ? "pd-10" : ""}
            ${className}
            `}
        {...rest}
      />
      {error && <p className="mt-2 ml-2 text-sm text-red-500/50">{error}</p>}
    </div>
  );
};

export default Input;
