import { FC } from "react";
import { Link } from "react-router-dom";
import TagBadge from "../TagBadge";
import AccountIcon from "./AccountIcon";
import AccountPassphraseCopier from "./AccountPassphraseCopier";

const AccountListItem: FC<AccountCard> = ({
  id,
  platform,
  identity,
  tags,
  icon,
  url,
}) => {
  return (
    <li
      className="flex items-center max-w-md w-full relative gap-2 p-2
      rounded-2xl transition-all duration-200 hover:scale-105
      hover:text-night-50 dark:hover:text-day-100"
    >
      <AccountIcon icon={icon} url={url} platform={platform} />

      <Link to={`/accounts/${id}`} className="flex flex-col grow">
        <strong className="text-lg">{platform}</strong>

        <small className="text-sm">{identity}</small>
      </Link>

      <div className="flex flex-wrap gap-2 absolute top-0 right-2">
        {tags.map((tag) => (
          <TagBadge key={tag.id} color={tag.color} icon={tag.icon} />
        ))}
      </div>

      <AccountPassphraseCopier id={id} />
    </li>
  );
};

export default AccountListItem;
