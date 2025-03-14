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
    <Link to="/accounts">
      <button
        onClick={() => {
          if (!isActive) return;
          if (!isOnTop) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className={classNames("rounded-full p-4 -m-4 shadow-inner", {
          "bg-day-300 dark:bg-night-700 text-day-00 dark:text-night-100 shadow-day-400 dark:shadow-night-500":
            !isActive,
          "bg-cream-500 text-cream-900": isActive,
        })}
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
