import { Icon, IconProps } from "@tabler/icons-react";
import classNames from "classnames";
import { createElement, FC } from "react";

type FABProps = {
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  label?: string;
  color: "primary" | "secondary" | "neutral";
  onClick: () => void;
};

const FAB: FC<FABProps> = ({ icon, label, color, onClick }) => {
  return (
    <button
      className={classNames(
        "flex items-center justify-center rounded-full p-2",
        "fixed md:bottom-6 md:right-6 bottom-16 right-2 gap-2",
        colors[color],
      )}
      onClick={onClick}
    >
      {createElement(icon, { size: 32 })}

      {label && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
};

const colors: Record<FABProps["color"], string> = {
  primary: "bg-cream-500 text-cream-100 dark:text-cream-900",
  secondary: "bg-dream-500 text-dream-100 dark:text-dream-900",
  neutral: "bg-day-200 text-night-500 dark:bg-night-200 dark:text-day-500",
};

export default FAB;
