import { FC, useState } from "react";
import { Link } from "react-router-dom";
import Yarn from "../../../utilities/Yarn";

const AccountIcon: FC<Pick<AccountCard, "icon" | "platform" | "url">> = ({
  icon,
  platform,
  url,
}) => {
  const [iconToDisplay, setIconToDisplay] = useState<string | null>(null);

  return (
    <Link to={url}>
      {iconToDisplay ? (
        <img
          src={icon}
          alt={platform}
          className="w-12 h-12 shrink-0 rounded-full"
          onError={() => setIconToDisplay(Yarn.getInitials(platform))}
        />
      ) : (
        <div
          className="w-12 h-12 shrink-0 rounded-full bg-day-400
          dark:bg-night-900 text-night-100 dark:text-day-900
          flex items-center justify-center font-semibold text-2xl"
        >
          {Yarn.getInitials(platform)}
        </div>
      )}
    </Link>
  );
};

export default AccountIcon;
