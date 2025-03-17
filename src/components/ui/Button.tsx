import { Icon, IconProps } from "@tabler/icons-react";
import classNames from "classnames";
import { useFormikContext } from "formik";
import React, { createElement } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "gradient" | "text" | "outlined";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "neutral";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  className?: string;
  icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
}

const Button = ({
  variant = "solid",
  color = "primary",
  size = "medium",
  children,
  className,
  disabled,
  icon,
  ...props
}: ButtonProps) => {
  const formik = useFormikContext();
  const isDisabled = disabled || formik?.isSubmitting;

  return (
    <button
      className={classNames(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant][color],
        className,
      )}
      disabled={isDisabled}
      type="button"
      {...props}
    >
      {children}

      {icon &&
        createElement(icon, {
          className: classNames(
            iconSizeStyles[size],
            "absolute top-1/2 -translate-y-1/2",
          ),
        })}
    </button>
  );
};

const baseStyles =
  "relative rounded-2xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110";

const sizeStyles = {
  small: "px-2 py-1",
  medium: "px-4 py-2",
  large: "px-6 py-3",
};

const iconSizeStyles = {
  small: "w-4 h-4 right-2",
  medium: "w-6 h-6 right-3",
  large: "w-8 h-8 right-4",
};

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
    primary: "border-2 border-cream-600 text-cream-600",
    secondary: "border-2 border-dream-600 text-dream-600",
    success: "border-2 border-green-600 text-green-600",
    warning: "border-2 border-orange-600 text-orange-600",
    danger: "border-2 border-red-600 text-red-600",
    info: "border-2 border-blue-600 text-blue-600",
    neutral: "border-2 border-gray-600 text-gray-600",
  },
};

export default Button;
