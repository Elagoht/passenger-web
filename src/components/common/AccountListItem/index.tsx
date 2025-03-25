import { FC } from "react";
import { Link } from "react-router-dom";
import TagBadge from "../TagBadge";
import AccountIcon from "./AccountIcon";
import AccountIdentityCopier from "./AccountIdentityCopier";
import AccountPassphraseCopier from "./AccountPassphraseCopier";

const AccountListItem: FC<AccountCard> = ({
  id,
  platform,
  identity,
  tags,
  url,
}) => {
  return (
    <li
      className="flex items-center w-full gap-2 p-2
      rounded-2xl transition-all duration-200 text-day-900
      hover:text-night-100 dark:text-day-400
      hover:dark:text-day-100 bg-day-100 dark:bg-night-900"
    >
      <AccountIcon url={url} platform={platform} />

      <Link
        to={`/accounts/details/${id}`}
        className="flex flex-col overflow-auto grow truncate font-semibold"
      >
        {platform}

        <div className="flex items-center -space-x-1.5 shrink-0">
          {tags.slice(0, 3).map((tag) => (
            <TagBadge
              key={tag.id}
              color={tag.color}
              icon={tag.icon}
              size="xsmall"
            />
          ))}

          {tags.length > 3 && (
            <div
              className="rounded-2xl bg-day-100 dark:bg-night-100 h-min px-1
          translate-x-1 text-xs"
            >
              +{tags.length - 3}
            </div>
          )}
        </div>
      </Link>

      <div className="flex">
        <AccountIdentityCopier identity={identity} />
        <AccountPassphraseCopier id={id} />
      </div>
    </li>
  );
};

export default AccountListItem;
