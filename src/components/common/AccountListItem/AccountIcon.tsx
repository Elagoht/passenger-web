import { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";

const AccountIcon: FC<Pick<AccountCard, "icon" | "platform" | "url">> = ({
  icon,
  platform,
  url,
}) => {
  const getInitials = useCallback((name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .slice(0, 2)
      .join("");
  }, []);

  const [iconToDisplay, setIconToDisplay] = useState<string | null>(null);

  return (
    <Link to={url}>
      {iconToDisplay ? (
        <img
          src={icon}
          alt={platform}
          className="w-12 h-12 shrink-0 rounded-full"
          onError={() => setIconToDisplay(getInitials(platform))}
        />
      ) : (
        <div
          className="w-12 h-12 shrink-0 rounded-full bg-day-400
      dark:bg-night-400 text-day-950 dark:text-night-950
          flex items-center justify-center font-semibold text-2xl"
        >
          {getInitials(platform)}
        </div>
      )}
    </Link>
  );
};

export default AccountIcon;
