import { FC, useState } from "react";
import { Link } from "react-router-dom";
import Yarn from "../../../utilities/Yarn";

const AccountIcon: FC<Pick<AccountCard, "platform" | "url">> = ({
  platform,
  url,
}) => {
  const [fallback, setFallback] = useState<boolean>(false);

  return (
    <Link
      to={completeUrl(url)}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 shrink-0 rounded-full"
    >
      {fallback ? (
        <div
          className="w-12 h-12 shrink-0 rounded-full bg-day-400
          dark:bg-night-900 text-night-100 dark:text-day-900
          flex items-center justify-center font-semibold text-2xl"
        >
          {Yarn.getInitials(platform)}
        </div>
      ) : (
        <img
          src={`https://iconhorse.com/${getNakedDomain(url)}`}
          alt={platform}
          className="w-12 h-12 shrink-0 rounded-full text-transparent"
          onError={() => setFallback(true)}
        />
      )}
    </Link>
  );
};

const getNakedDomain = (url: string) => {
  const urlObj = new URL(completeUrl(url));
  const hostname = urlObj.hostname;
  const parts = hostname.split(".");
  return parts.length > 2 ? parts.slice(1).join(".") : hostname;
};

const completeUrl = (url: string) => {
  if (!url) return "";
  if (!url.startsWith("http")) url = `http://${url}`;
  return url;
};

export default AccountIcon;
