import { IconArrowUp, IconKey, IconSearch } from "@tabler/icons-react";
import classNames from "classnames";
import { createElement, FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MainButton: FC = () => {
  const [isOnTop, setIsOnTop] = useState(true);
  const location = useLocation();

  const isActive = location.pathname === "/accounts";

  useEffect(() => {
    const handleScroll = () => {
      setIsOnTop(window.scrollY < 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link to="/accounts" className="md:hidden">
      <button
        onClick={() => {
          if (!isActive) return;
          if (!isOnTop) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className={classNames(
          "rounded-full p-3 -m-3 transition-all duration-300",
          {
            "bg-cream-500 text-cream-900 dark:text-cream-100": isActive,
            "bg-dream-500 text-dream-900 dark:text-dream-100": !isActive,
          },
        )}
      >
        {createElement(getIcon(isActive, isOnTop), {
          size: 64,
          stroke: 1.5,
        })}
      </button>
    </Link>
  );
};

const getIcon = (isActive: boolean, isOnTop: boolean) => {
  if (!isActive) return IconKey;
  if (isOnTop) return IconSearch;
  return IconArrowUp;
};

export default MainButton;
