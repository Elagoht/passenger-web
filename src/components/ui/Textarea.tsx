import { Icon, IconProps } from "@tabler/icons-react";
import classNames from "classnames";
import { FieldHookConfig, useField } from "formik";
import React, { createElement, FC } from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  name: string;
  standalone?: boolean;
  icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
}

export const Textarea: FC<TextareaProps> = ({
  label,
  error,
  className,
  standalone = true,
  icon,
  ...props
}) => {
  const [field, meta] = useField(props as FieldHookConfig<string>);

  // Use a fallback for meta when not standalone
  const showError = standalone ? meta.error && meta.touched : error;

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={props.name}
          className="block text-sm font-medium ml-4 mb-1
          text-night-700 dark:text-day-200"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <textarea
          style={props.style}
          {...(standalone ? field : props)}
          className={classNames(
            "w-full min-w-0 px-4 py-2 min-w-none rounded-2xl",
            "bg-day-100 dark:bg-night-400",
            "text-night-900 dark:text-day-200 transition-all",
            "outline-none focus:ring-2 ring-dream-600",
            "resize-y min-h-32",
            className,
            {
              "pl-12": icon,
              "border-red-500 focus:border-red-500 focus:ring-red-500":
                showError,
            },
          )}
        />

        {icon && (
          <div className="absolute top-4 left-4">
            {createElement(icon, {
              size: 24,
            })}
          </div>
        )}
      </div>

      {showError && (
        <p className="text-sm mt-1 ml-4 text-red-500 dark:text-red-400">
          {standalone ? meta.error : error}
        </p>
      )}
    </div>
  );
};
