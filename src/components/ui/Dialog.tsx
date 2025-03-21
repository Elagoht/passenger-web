import classNames from "classnames";
import { FC } from "react";
import Button from "./Button";

type DialogProps = {
  isOpen: boolean;
  close: () => void;
  title: string;
  description: string;
  submitText: string;
  onSubmit: () => void;
  cancelText: string;
  onCancel: () => void;
  submitColor?: "primary" | "secondary" | "success" | "warning" | "danger";
};

const Dialog: FC<DialogProps> = ({
  isOpen,
  close,
  title,
  description,
  submitText,
  onSubmit,
  cancelText,
  onCancel,
  submitColor = "primary",
}) => {
  return (
    <div
      className={classNames(
        "fixed inset-0 flex items-center justify-center",
        "backdrop-blur bg-black bg-opacity-50",
        "transition-all duration-300 z-50 p-4",
        { "opacity-0 pointer-events-none": !isOpen },
      )}
      onClick={close}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={classNames(
          "max-w-screen-sm w-full",
          "bg-day-100 dark:bg-night-700 rounded-2xl p-4",
          "flex flex-col gap-4 transition-all duration-300",
          { "opacity-0 translate-y-24": !isOpen },
        )}
      >
        <h2 className="text-2xl font-bold">{title}</h2>

        <p className="text-gray-500">{description}</p>

        <div
          className="flex justify-end -m-4 mt-0 gap-2 p-2 rounded-b-2xl
          bg-day-200 dark:bg-night-500"
        >
          <Button onClick={onCancel} variant="outlined">
            {cancelText}
          </Button>

          <Button color={submitColor} onClick={onSubmit}>
            {submitText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
