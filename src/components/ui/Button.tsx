import React from "react"
import classNames from "classnames"
import { useFormikContext } from "formik"

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
  ignoreFormik?: boolean
}

const Button = ({
  variant = "solid",
  color = "primary",
  children,
  className,
  ignoreFormik = false,
  disabled,
  ...props
}: ButtonProps) => {
  const formik = useFormikContext()
  const isDisabled = ignoreFormik ? disabled : (formik?.isSubmitting || disabled)

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

const baseStyles = "px-4 py-3 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"

const variantStyles = {
  solid: {
    primary: "bg-cream-600 text-white hover:bg-cream-700",
    secondary: "bg-dream-600 text-white hover:bg-dream-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-orange-600 text-white hover:bg-orange-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    info: "bg-blue-600 text-white hover:bg-blue-700",
    neutral: "bg-gray-600 text-white hover:bg-gray-700",
  },
  gradient: {
    primary: "bg-gradient-to-b from-cream-500 to-cream-700 text-white hover:from-cream-600 hover:to-cream-800",
    secondary: "bg-gradient-to-b from-dream-500 to-dream-700 text-white hover:from-dream-600 hover:to-dream-800",
    success: "bg-gradient-to-b from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800",
    warning: "bg-gradient-to-b from-orange-500 to-orange-700 text-white hover:from-orange-600 hover:to-orange-800",
    danger: "bg-gradient-to-b from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800",
    info: "bg-gradient-to-b from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800",
    neutral: "bg-gradient-to-b from-gray-500 to-gray-700 text-white hover:from-gray-600 hover:to-gray-800",
  },
  text: {
    primary: "text-cream-600 hover:bg-cream-50",
    secondary: "text-dream-600 hover:bg-dream-50",
    success: "text-green-600 hover:bg-green-50",
    warning: "text-orange-600 hover:bg-orange-50",
    danger: "text-red-600 hover:bg-red-50",
    info: "text-blue-600 hover:bg-blue-50",
    neutral: "text-gray-600 hover:bg-gray-50",
  },
  outlined: {
    primary: "border border-cream-600 text-cream-600 hover:bg-cream-50",
    secondary: "border border-dream-600 text-dream-600 hover:bg-dream-50",
    success: "border border-green-600 text-green-600 hover:bg-green-50",
    warning: "border border-orange-600 text-orange-600 hover:bg-orange-50",
    danger: "border border-red-600 text-red-600 hover:bg-red-50",
    info: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    neutral: "border border-gray-600 text-gray-600 hover:bg-gray-50",
  },
}

export default Button