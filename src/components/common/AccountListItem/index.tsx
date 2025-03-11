import { FC } from "react"
import { Link } from "react-router"
import TagBadge from "../TagBadge"
import AccountIcon from "./AccountIcon"

const AccountListItem: FC<AccountCard> = ({
  id, name, identity, tags, icon
}) => {
  return <Link
    className="flex items-center max-w-md w-full relative gap-2 p-2
    rounded-2xl transition-all duration-200 border-2 border-transparent
    hover:border-day-300 dark:hover:border-night-500
    hover:text-night-50 dark:hover:text-day-950"
    to={`/accounts/${id}`}
  >
    <AccountIcon icon={icon} name={name} />

    <div className="flex flex-col">
      <strong className="text-lg">{name}</strong>

      <small className="text-sm">{identity}</small>
    </div>

    <div className="flex flex-wrap gap-2 absolute top-0 right-2">
      {tags.map((tag) =>
        <TagBadge
          key={tag.id + id}
          color={tag.color}
          icon={tag.icon}
        />
      )}
    </div>
  </Link>
}

export default AccountListItem