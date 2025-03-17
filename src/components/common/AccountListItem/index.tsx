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
  url,
}) => {
  return (
    <li
      className="flex items-center max-w-md w-full relative gap-2 p-2
      rounded-2xl transition-all duration-200 text-day-900
      hover:text-night-100 dark:text-day-100"
    >
      <AccountIcon url={url} platform={platform} />

      <Link
        to={`/accounts/details/${id}`}
        className="flex flex-col overflow-auto grow"
      >
        <strong className="text-lg truncate">{platform}</strong>

        <small className="text-sm truncate">{identity}</small>
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
