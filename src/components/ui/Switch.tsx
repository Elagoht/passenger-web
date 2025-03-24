import classNames from "classnames";
import { FieldHookConfig, useField } from "formik";
import React, { FC } from "react";

interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  name: string;
}

export const Switch: FC<SwitchProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props as FieldHookConfig<boolean>);

  // Use a fallback for meta when not standalone
  const showError = meta.error && meta.touched;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange({
      target: {
        name: props.name,
        value: event.target.checked,
      },
    });
    props.onChange?.(event);
  };

  return (
    <div className="w-full text-left">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={field.value}
            onChange={handleChange}
            tabIndex={0}
            {...props}
          />
          <div
            className={classNames(
              "block w-10 h-6 rounded-full transition-colors duration-200 ease-in-out",
              "bg-day-400 dark:bg-night-400",
              { "bg-cream-400 dark:bg-cream-600": field.value },
            )}
          >
            <div
              className={classNames(
                "absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-200 ease-in-out",
                "bg-white dark:bg-day-200",
                { "translate-x-4": field.value },
              )}
            />
          </div>
        </div>

        {label && (
          <span className="ml-3 text-sm font-medium text-night-700 dark:text-day-200">
            {label}
          </span>
        )}
      </label>

      {showError && (
        <p className="text-sm mt-1 ml-4 text-red-500 dark:text-red-400">
          {meta.error}
        </p>
      )}
    </div>
  );
};
