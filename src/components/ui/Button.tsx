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
  solidIcon?: boolean;
}

const Button = ({
  variant = "solid",
  color = "primary",
  size = "medium",
  children,
  className,
  disabled,
  icon,
  solidIcon = false,
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
        { relative: !solidIcon, "gap-2": icon && solidIcon },
      )}
      disabled={isDisabled}
      type="button"
      {...props}
    >
      {icon && solidIcon ? <div className="grow">{children}</div> : children}

      {icon &&
        createElement(icon, {
          className: classNames(iconSizeStyles[size], {
            "absolute top-1/2 -translate-y-1/2": !solidIcon,
          }),
        })}
    </button>
  );
};

const baseStyles =
  "rounded-2xl flex items-center justify-center border-2 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110";

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
    primary: "bg-cream-600 text-white border-cream-600",
    secondary: "bg-dream-600 text-white border-dream-600",
    success: "bg-green-600 text-white border-green-600",
    warning: "bg-orange-600 text-white border-orange-600",
    danger: "bg-red-600 text-white border-red-600",
    info: "bg-blue-600 text-white border-blue-600",
    neutral: "bg-day-600 text-white border-day-600",
  },
  gradient: {
    primary:
      "bg-gradient-to-br from-cream-500 to-cream-600 text-cream-50 border-cream-500",
    secondary:
      "bg-gradient-to-br from-dream-500 to-dream-600 text-dream-50 border-dream-500",
    success:
      "bg-gradient-to-br from-green-500 to-green-600 text-green-50 border-green-500",
    warning:
      "bg-gradient-to-br from-orange-500 to-orange-600 text-orange-50 border-orange-500",
    danger:
      "bg-gradient-to-br from-red-500 to-red-600 text-red-50 border-red-500",
    info: "bg-gradient-to-br from-blue-500 to-blue-600 text-blue-50 border-blue-500",
    neutral:
      "bg-gradient-to-br from-day-500 to-day-600 text-day-50 border-day-500",
  },
  text: {
    primary: "text-cream-600 border-transparent",
    secondary: "text-dream-600 border-transparent",
    success: "text-green-600 border-transparent",
    warning: "text-orange-600 border-transparent",
    danger: "text-red-600 border-transparent",
    info: "text-blue-600 border-transparent",
    neutral: "text-day-600 border-transparent",
  },
  outlined: {
    primary: "border-cream-600 text-cream-600",
    secondary: "border-dream-600 text-dream-600",
    success: "border-green-600 text-green-600",
    warning: "border-orange-600 text-orange-600",
    danger: "border-red-600 text-red-600",
    info: "border-blue-600 text-blue-600",
    neutral: "border-day-600 text-day-600",
  },
};

export default Button;
