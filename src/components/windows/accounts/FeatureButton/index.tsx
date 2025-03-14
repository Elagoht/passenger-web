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
        "rounded-lg flex flex-col items-center justify-center border-opacity-60 bg-opacity-40 p-2 border-2 w-full",
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
