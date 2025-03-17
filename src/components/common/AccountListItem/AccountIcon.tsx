import { FC, useState } from "react";
import { Link } from "react-router-dom";
import Yarn from "../../../utilities/Yarn";

const AccountIcon: FC<Pick<AccountCard, "platform" | "url">> = ({
  platform,
  url,
}) => {
  const [fallback, setFallback] = useState<boolean>(false);

  return (
    <Link to={url} className="w-12 h-12 shrink-0 rounded-full">
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
          src={`https://favicone.com/${getNakedDomain(url)}?s=54`}
          alt={platform}
          className="w-12 h-12 shrink-0 rounded-full text-transparent"
          onError={() => setFallback(true)}
        />
      )}
    </Link>
  );
};

const getNakedDomain = (url: string) => {
  if (!url) return "";
  if (!url.startsWith("http")) url = `https://${url}`;
  const urlObj = new URL(url);
  const hostname = urlObj.hostname;
  const parts = hostname.split(".");
  return parts.length > 2 ? parts.slice(1).join(".") : hostname;
};

export default AccountIcon;
