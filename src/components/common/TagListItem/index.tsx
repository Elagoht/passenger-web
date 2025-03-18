import { FC } from "react";
import { Link } from "react-router";
import TagBadge from "../TagBadge";

const TagListItem: FC<Tag> = (props) => {
  return (
    <Link
      className="flex items-center justify-center"
      to={`/tags/details/${props.id}`}
    >
      <TagBadge
        icon={props.icon}
        color={props.color}
        name={props.name}
        size="large"
        isPanic={props.isPanic}
      />
    </Link>
  );
};

export default TagListItem;
