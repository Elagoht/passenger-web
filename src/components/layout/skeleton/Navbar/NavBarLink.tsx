import { Icon, IconProps } from "@tabler/icons-react";
import classNames from "classnames";
import { createElement, FC } from "react";
import { Link, useLocation } from "react-router-dom";

type NavBarLinkProps = {
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  label: string;
  path: string;
};

const NavBarLink: FC<NavBarLinkProps> = ({ icon, label, path }) => {
  const location = useLocation();

  const isActive = location.pathname === path;

  return (
    <Link to={path} className="p-4 rounded-full">
      {createElement(icon, {
        size: 32,
        className: classNames({
          "text-day-900 dark:text-night-100": !isActive,
          "text-cream-500": isActive,
        }),
      })}

      <span className="text-day-900 dark:text-night-100 max-sm:hidden">
        {label}
      </span>
    </Link>
  );
};

export default NavBarLink;
