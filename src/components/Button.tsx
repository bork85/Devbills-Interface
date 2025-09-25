
// biome-ignore assist/source/organizeImports: <>
import type { ButtonHTMLAttributes} from 'react';
type ButtonVariants = 'primary' | "outline" | 'secondary' | "success" | "danger";

const renderLoading = (children?: React.ReactNode) => (
    <div className="flex items-center justify-center">
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
        <title>Loading spinner</title>
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {children}
    </div>
  );

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode,
    variant?: ButtonVariants,
    fullWidth?: boolean,
    isLoading?: boolean,
}

const Button = ({
    children,
    variant = 'primary',
    fullWidth = false,
    isLoading = false,
    className,
    disabled,
    ...rest
}: ButtonProps) => {
    const variantClasses = {
    primary: "bg-primary-500 text-[#051626] font-semibold hover:bg-primary-600 active:trasnlate-y-0",
    outline: "border border-primary-500 text-primary-500 hover:bg-primary-500/10 ",
    secondary: "bg-gray-800 text-white hover:bg-gray-700",
    success: "bg-green-500 text-[#051626] hover:brightness-90",
    danger: "bg-red-500 text-white hover:brightness-90",
  };

    return(
        <div>
            <button 
                type="button" 
                className={`px-5 py-2.5 rounded-2xl font-medium transitions-all flex items-center justify-center cursor-pointer
                    ${variantClasses[variant]}
                    ${fullWidth ? 'w-full' : ''}
                    ${className}
                    ${isLoading || disabled ? 'opacity-70 cursor-not-allowed' : ''}
                `}
                disabled= {isLoading || disabled}
                {...rest}
            >
                {isLoading ? renderLoading(children) : children}
            </button>
        </div>
    )
}

export default Button;