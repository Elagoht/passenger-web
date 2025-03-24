import { Icon, IconProps } from "@tabler/icons-react";
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
}

export const Combobox: FC<ComboboxProps> = ({
  label,
  className,
  icon,
  options,
  placeholder = "Select an option",
  ...props
}) => {
  const [field, meta] = useField(props as FieldHookConfig<string>);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectedOption = options.find((option) => option.value === field.value);

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

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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
          prev < filteredOptions.length - 1 ? prev + 1 : 0,
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1,
        );
        break;
      case "Enter":
        event.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          field.onChange({
            target: {
              name: props.name,
              value: filteredOptions[highlightedIndex].value,
            },
          });
          setIsOpen(false);
          setSearchQuery("");
          setHighlightedIndex(0);
        }
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        setSearchQuery("");
        setHighlightedIndex(0);
        break;
      case "Tab":
        setIsOpen(false);
        break;
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
          tabIndex={0}
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
            },
          )}
          onClick={() => {
            const selectedIndex = filteredOptions.findIndex(
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
            isOpen && filteredOptions[highlightedIndex]
              ? `option-${filteredOptions[highlightedIndex].value}`
              : undefined
          }
        >
          <div className="flex items-center justify-between">
            <span className={!selectedOption ? "text-gray-400" : ""}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <svg
              className={classNames(
                "w-5 h-5 transition-transform",
                isOpen ? "rotate-180" : "",
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
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
            <div className="p-2">
              <input
                ref={inputRef}
                type="text"
                className="w-full px-3 py-2 rounded-xl bg-day-100 dark:bg-night-500 text-night-900 dark:text-day-200 outline-none focus:ring-2 ring-dream-600"
                placeholder="Search..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onClick={(event) => event.stopPropagation()}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div
              className="max-h-60 overflow-y-auto"
              onMouseLeave={() => setHighlightedIndex(-1)}
            >
              {filteredOptions.map((option, index) => (
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
                  onClick={() => {
                    field.onChange({
                      target: {
                        name: props.name,
                        value: option.value,
                      },
                    });
                    setIsOpen(false);
                    setSearchQuery("");
                    setHighlightedIndex(0);
                  }}
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
