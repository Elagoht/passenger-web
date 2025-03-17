import { FC } from "react";
import { Link } from "react-router";
import TagBadge from "../TagBadge";

const TagListItem: FC<Tag> = (props) => {
  return (
    <Link to={`/tags/${props.id}`}>
      <TagBadge
        icon={props.icon}
        color={props.color}
        name={props.name}
        size="large"
      />
    </Link>
  );
};

export default TagListItem;
