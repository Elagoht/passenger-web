import { Icon, IconProps } from "@tabler/icons-react";
import classNames from "classnames";
import { createElement, FC } from "react";

type FeatureButtonProps = {
  title: string;
  className: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  onClick: () => void;
};

const FeatureButton: FC<FeatureButtonProps> = ({
  title,
  className,
  icon,
  onClick,
}) => {
  return (
    <button
      className={classNames(
        "flex max-md:flex-col md:gap-2 items-center justify-center",
        "bg-opacity-40 p-2 w-full rounded-2xl",
        className,
      )}
      onClick={onClick}
    >
      {createElement(icon, { size: 24 })}

      {title}
    </button>
  );
};

export default FeatureButton;
