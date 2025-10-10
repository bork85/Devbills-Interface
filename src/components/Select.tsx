import { ChevronDown } from "lucide-react";
import { type ReactNode, type SelectHTMLAttributes, useId } from "react";

interface SelectOptions {
  value: string;
  label: string;
}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  fullwidth?: boolean;
  options: SelectOptions[];
}

const Select = ({
  label,
  error,
  icon,
  fullwidth = true,
  options,
  className = "",
  id,
  ...rest
}: SelectProps) => {
  const selectId = useId();
  return (
    <div className={`${fullwidth ? "w-full" : ""} mb-4 relative`}>
      {label && (
        <label htmlFor={id ?? selectId} className="block text-sm font-medium text-gray-50 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute inset-y-0 top-[22px] left-2 pl-2 flex items-center text-gray-400">{icon}</div>}
      </div>
      <select
        id={id ?? selectId}
        className={`block w-full bg-gray-700 py-3 pl-10 pr-4 rounded-xl text-gray-50 text-sm outline-none ${error ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-primary-500"} appearance-none`}
        style={{color: "var(--color-gray-50)"}}
        {...rest}
      >
        {options.map((option: SelectOptions) => (
          <option key={option.value} value={option.value} >
            {option.label}
          </option>
        ))}
      </select>
      <div>
        <ChevronDown className="w-5 h-5 absolute right-0 top-10 mr-3 inset-y-0 text-gray-400" />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
