import { Icon, IconChevronDown, IconProps } from "@tabler/icons-react";
import classNames from "classnames";
import { FieldHookConfig, useField } from "formik";
import React, { createElement, FC, useEffect, useRef, useState } from "react";

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  label?: string;
  error?: string;
  name: string;
  options: ComboboxOption[];
  icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const Combobox: FC<ComboboxProps> = ({
  label,
  className,
  icon,
  options,
  placeholder = "Select an option",
  value,
  onChange,
  disabled = false,
  ...props
}) => {
  const [field, meta] = useField(props as FieldHookConfig<string>);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === (value || field.value),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : 0,
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : options.length - 1,
        );
        break;
      case "Enter":
        event.preventDefault();
        if (options[highlightedIndex]) {
          field.onChange({
            target: {
              name: props.name,
              value: options[highlightedIndex].value,
            },
          });
          setIsOpen(false);
          setHighlightedIndex(0);
        }
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(0);
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  const handleOptionClick = (option: ComboboxOption) => {
    setIsOpen(false);
    const event = {
      target: {
        name: props.name,
        value: option.value,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    if (onChange) {
      onChange(event);
    } else {
      field.onChange(event);
    }
  };

  return (
    <div className="w-full text-left" ref={wrapperRef}>
      {label && (
        <label
          htmlFor={props.name}
          className="block text-sm font-medium ml-4 mb-1 text-night-700 dark:text-day-200"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <div
          ref={comboboxRef}
          tabIndex={disabled ? -1 : 0}
          className={classNames(
            "w-full min-w-0 px-4 py-2 min-w-none rounded-2xl",
            "bg-day-100 dark:bg-night-400",
            "text-night-900 dark:text-day-200 transition-all",
            "outline-none focus:ring-2 ring-dream-600",
            "cursor-pointer",
            className,
            {
              "pl-12": icon,
              "border-red-500 focus:border-red-500 focus:ring-red-500":
                meta.error && meta.touched,
              "opacity-50 cursor-not-allowed": disabled,
            },
          )}
          onClick={() => {
            if (disabled) return;
            const selectedIndex = options.findIndex(
              (option) => option.value === field.value,
            );
            setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
            setIsOpen(!isOpen);
          }}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="combobox-options"
          aria-activedescendant={
            isOpen && options[highlightedIndex]
              ? `option-${options[highlightedIndex].value}`
              : undefined
          }
          aria-disabled={disabled}
        >
          <div className="flex items-center justify-between">
            <span className={!selectedOption ? "text-gray-400" : ""}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>

            <IconChevronDown
              className={classNames("transition-all duration-300", {
                "rotate-180": isOpen,
              })}
            />
          </div>
        </div>

        {icon && (
          <div className="absolute inset-y-0 left-4 flex items-center">
            {createElement(icon, {
              size: 24,
            })}
          </div>
        )}

        {isOpen && (
          <div
            id="combobox-options"
            className="absolute z-10 w-full mt-1 bg-white dark:bg-night-400 rounded-2xl shadow-lg border border-gray-200 dark:border-night-300"
            role="listbox"
          >
            <div
              className="max-h-60 overflow-y-auto"
              onMouseLeave={() => setHighlightedIndex(-1)}
            >
              {options.map((option, index) => (
                <div
                  key={option.value}
                  id={`option-${option.value}`}
                  role="option"
                  aria-selected={option.value === field.value}
                  className={classNames(
                    "px-4 py-2 cursor-pointer hover:bg-dream-400 dark:hover:bg-dream-800 first:rounded-t-xl last:rounded-b-xl bg-opacity-50 dark:bg-opacity-50",
                    {
                      "bg-dream-500 bg-opacity-50 dark:bg-opacity-50 dark:bg-dream-700 text-white":
                        option.value === field.value,
                      "bg-dream-400 bg-opacity-50 dark:bg-opacity-50 dark:bg-dream-800 text-white":
                        index === highlightedIndex &&
                        option.value !== field.value,
                    },
                  )}
                  onClick={() => handleOptionClick(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {meta.error && meta.touched && (
        <p className="text-sm mt-1 ml-4 text-red-500 dark:text-red-400">
          {meta.error}
        </p>
      )}
    </div>
  );
};
