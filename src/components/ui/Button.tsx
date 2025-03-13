import classNames from "classnames"
import { useFormikContext } from "formik"
import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "gradient" | "text" | "outlined"
  color?:
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  children: React.ReactNode
  className?: string
}

const Button = ({
  variant = "solid",
  color = "primary",
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const formik = useFormikContext()
  const isDisabled = disabled || formik?.isSubmitting

  return <button
    className={classNames(
      baseStyles,
      variantStyles[variant][color],
      className
    )}
    disabled={isDisabled}
    type="button"
    {...props}
  >
    {children}
  </button>
}

const baseStyles = "px-4 py-3 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110"

const variantStyles = {
  solid: {
    primary: "bg-cream-600 text-white",
    secondary: "bg-dream-600 text-white",
    success: "bg-green-600 text-white",
    warning: "bg-orange-600 text-white",
    danger: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
    neutral: "bg-gray-600 text-white",
  },
  gradient: {
    primary: "bg-gradient-to-br from-cream-500 to-cream-600 text-cream-50",
    secondary: "bg-gradient-to-br from-dream-500 to-dream-600 text-dream-50",
    success: "bg-gradient-to-br from-green-500 to-green-600 text-green-50",
    warning: "bg-gradient-to-br from-orange-500 to-orange-600 text-orange-50",
    danger: "bg-gradient-to-br from-red-500 to-red-600 text-red-50",
    info: "bg-gradient-to-br from-blue-500 to-blue-600 text-blue-50",
    neutral: "bg-gradient-to-br from-gray-500 to-gray-600 text-gray-50",
  },
  text: {
    primary: "text-cream-600",
    secondary: "text-dream-600",
    success: "text-green-600",
    warning: "text-orange-600",
    danger: "text-red-600",
    info: "text-blue-600",
    neutral: "text-gray-600",
  },
  outlined: {
    primary: "border border-cream-600 text-cream-600",
    secondary: "border border-dream-600 text-dream-600",
    success: "border border-green-600 text-green-600",
    warning: "border border-orange-600 text-orange-600",
    danger: "border border-red-600 text-red-600",
    info: "border border-blue-600 text-blue-600",
    neutral: "border border-gray-600 text-gray-600",
  },
}

export default Button