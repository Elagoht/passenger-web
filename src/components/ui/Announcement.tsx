import { Icon, IconProps, IconX } from "@tabler/icons-react";
import classNames from "classnames";
import { createElement, FC, useState } from "react";

interface AnnouncementProps {
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  children: React.ReactNode;
  dismissible?: boolean;
  variant?: "primary" | "secondary" | "success" | "warning" | "info" | "danger";
}

const Announcement: FC<AnnouncementProps> = ({
  icon,
  children,
  dismissible = false,
  variant = "primary",
}) => {
  const [dismissed, setDismissed] = useState<boolean>(false);

  if (dismissed) return null;

  return (
    <div
      className={classNames(
        "flex items-center rounded-lg p-2 gap-2",
        "border-2 border-opacity-80 bg-opacity-20",
        {
          "bg-cream-500 border-cream-500 text-cream-500": variant === "primary",
          "bg-dream-500 border-dream-500 text-dream-500":
            variant === "secondary",
          "bg-green-500 border-green-500 text-green-500": variant === "success",
          "bg-amber-500 border-amber-500 text-amber-500": variant === "warning",
          "bg-blue-500 border-blue-500 text-blue-500": variant === "info",
          "bg-red-500 border-red-500 text-red-500": variant === "danger",
        },
      )}
    >
      {createElement(icon, { className: "w-6 h-6 shrink-0" })}

      {children}

      {dismissible && (
        <button
          className="text-sm text-gray-500"
          onClick={() => setDismissed(true)}
        >
          <IconX />
        </button>
      )}
    </div>
  );
};

export default Announcement;
