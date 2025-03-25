import { IconUpload } from "@tabler/icons-react";
import classNames from "classnames";
import { FieldHookConfig, useField } from "formik";
import React, { FC, useRef, useState } from "react";

interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  name: string;
  accept?: string;
  maxSize?: number;
  onFileSelect?: (file: File) => void;
}

export const FileInput: FC<FileInputProps> = ({
  label,
  className,
  accept,
  maxSize,
  onFileSelect,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [field, meta] = useField(props as FieldHookConfig<File | null>);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (maxSize && file.size > maxSize) {
      return;
    }

    setFileName(file.name);
    field.onChange({ target: { name: props.name, value: file } });
    onFileSelect?.(file);
  };

  const showError = meta.error && meta.touched;

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
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
          {...props}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={classNames(
            "w-full min-w-0 px-4 py-2 min-w-none rounded-2xl",
            "bg-day-100 dark:bg-night-400",
            "text-night-900 dark:text-day-200 transition-all",
            "outline-none focus:ring-2 ring-dream-600",
            "flex items-center justify-center gap-2",
            className,
            {
              "border-red-500 focus:border-red-500 focus:ring-red-500":
                showError,
            },
          )}
        >
          <IconUpload size={24} />
          <span>{fileName || "Choose File"}</span>
        </button>
      </div>

      {showError && (
        <p className="text-sm mt-1 ml-4 text-red-500 dark:text-red-400">
          {meta.error}
        </p>
      )}
    </div>
  );
};
