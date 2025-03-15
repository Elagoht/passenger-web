import { Icon, IconProps } from "@tabler/icons-react";
import classNames from "classnames";
import { createElement, FC } from "react";
import { Link, useLocation } from "react-router-dom";

type NavBarLinkProps = {
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  label: string;
  path: string;
  hiddenOnMobile?: boolean;
};

const NavBarLink: FC<NavBarLinkProps> = ({
  icon,
  label,
  path,
  hiddenOnMobile,
}) => {
  const location = useLocation();

  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      tabIndex={hiddenOnMobile ? 1 : 0}
      className={classNames("md:p-2 p-4 rounded-full flex items-center gap-2", {
        "max-md:hidden": hiddenOnMobile,
        "text-night-500 dark:text-day-500": !isActive,
        "text-cream-500": isActive,
      })}
    >
      {createElement(icon, {
        size: 32,
      })}

      <span className="max-md:hidden">{label}</span>
    </Link>
  );
};

export default NavBarLink;
