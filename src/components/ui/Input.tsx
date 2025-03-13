import { Icon, IconEye, IconEyeOff, IconProps } from "@tabler/icons-react";
import classNames from "classnames";
import { FieldHookConfig, useField } from "formik";
import React, { createElement, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  name: string;
  standalone?: boolean;
  icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
}

export const Input = ({
  label,
  error,
  className,
  standalone = true,
  icon,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(props.type !== "password");

  const [field, meta] = useField(props as FieldHookConfig<string>);

  // Use a fallback for meta when not standalone
  const showError = standalone ? meta.error && meta.touched : error;

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={props.name}
          className="block text-sm font-medium ml-4 mb-1 text-night-700 dark:text-day-200"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          {...(standalone ? field : props)}
          type={
            props.type === "password"
              ? showPassword
                ? "text"
                : "password"
              : props.type
          }
          className={classNames(
            "w-full min-w-0 px-4 py-2 min-w-none rounded-full",
            "bg-day-300 dark:bg-night-500",
            "text-night-900 dark:text-day-200 transition-all",
            "outline-none focus:ring-2 ring-dream-600",
            className,
            {
              "pl-12": icon,
              "pr-12": props.type === "password",
              "border-red-500 focus:border-red-500 focus:ring-red-500":
                showError,
            },
          )}
        />

        {icon && (
          <div className="absolute inset-y-0 left-4 flex items-center">
            {createElement(icon, {
              size: 24,
            })}
          </div>
        )}

        {props.type === "password" && (
          <button
            className="absolute inset-y-0 right-4 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IconEyeOff /> : <IconEye />}
          </button>
        )}
      </div>
      {showError && (
        <p className="text-sm mt-1 text-red-500 dark:text-red-400">
          {standalone ? meta.error : error}
        </p>
      )}
    </div>
  );
};
