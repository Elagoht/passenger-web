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
          "rounded-full p-4 -m-4 shadow-inner bg-gradient-to-t",
          "from-cream-500 to-cream-300 text-cream-700",
          "transition-all duration-300",
          { grayscale: !isActive },
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
