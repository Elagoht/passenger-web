import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

type BoxProps = PropsWithChildren<{
  shade: 100 | 200 | 300 | 700 | 800 | 900;
  color: "default" | "inverted" | "cream" | "dream";
  padding: "none" | "sm" | "md" | "lg" | "xl";
  rounded: "none" | "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  orientation?: "horizontal" | "vertical";
}>;

const Box: FC<Partial<BoxProps>> = ({
  children,
  shade = 100,
  color = "default",
  padding = "md",
  rounded = "xl",
  className,
  orientation = "vertical",
}) => {
  return (
    <div
      className={classNames(
        baseClasses,
        colorClasses[color][shade],
        paddingClasses[padding],
        roundedClasses[rounded],
        orientationClasses[orientation],
        className,
      )}
    >
      {children}
    </div>
  );
};

const baseClasses = "w-full";

const colorClasses: Record<
  BoxProps["color"],
  Record<BoxProps["shade"], string>
> = {
  default: {
    100: "bg-day-100 dark:bg-night-900 text-night-900 dark:text-day-100",
    200: "bg-day-200 dark:bg-night-800 text-night-800 dark:text-day-200",
    300: "bg-day-300 dark:bg-night-700 text-night-700 dark:text-day-300",
    700: "bg-day-700 dark:bg-night-300 text-night-300 dark:text-day-700",
    800: "bg-day-800 dark:bg-night-200 text-night-200 dark:text-day-800",
    900: "bg-day-900 dark:bg-night-100 text-night-100 dark:text-day-900",
  },
  inverted: {
    100: "bg-night-100 dark:bg-day-900 text-day-900 dark:text-night-100",
    200: "bg-night-200 dark:bg-day-800 text-day-800 dark:text-night-200",
    300: "bg-night-300 dark:bg-day-700 text-day-700 dark:text-night-300",
    700: "bg-night-700 dark:bg-day-300 text-day-300 dark:text-night-700",
    800: "bg-night-800 dark:bg-day-200 text-day-200 dark:text-night-800",
    900: "bg-night-900 dark:bg-day-100 text-day-100 dark:text-night-900",
  },
  cream: {
    100: "bg-cream-100 dark:bg-cream-900 text-cream-900 dark:text-cream-100",
    200: "bg-cream-200 dark:bg-cream-800 text-cream-800 dark:text-cream-200",
    300: "bg-cream-300 dark:bg-cream-700 text-cream-700 dark:text-cream-300",
    700: "bg-cream-700 dark:bg-cream-300 text-cream-300 dark:text-cream-700",
    800: "bg-cream-800 dark:bg-cream-200 text-cream-200 dark:text-cream-800",
    900: "bg-cream-900 dark:bg-cream-100 text-cream-100 dark:text-cream-900",
  },
  dream: {
    100: "bg-dream-100 dark:bg-dream-900 text-dream-900 dark:text-dream-100",
    200: "bg-dream-200 dark:bg-dream-800 text-dream-800 dark:text-dream-200",
    300: "bg-dream-300 dark:bg-dream-700 text-dream-700 dark:text-dream-300",
    700: "bg-dream-700 dark:bg-dream-300 text-dream-300 dark:text-dream-700",
    800: "bg-dream-800 dark:bg-dream-200 text-dream-200 dark:text-dream-800",
    900: "bg-dream-900 dark:bg-dream-100 text-dream-100 dark:text-dream-900",
  },
};

const paddingClasses = {
  none: "",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
};

const roundedClasses = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const orientationClasses = {
  horizontal: "flex",
  vertical: "flex flex-col",
};

export default Box;
