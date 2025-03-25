import { IconArchiveFilled } from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";

const WordlistCard: FC<WordlistCard> = (props) => {
  return (
    <Link
      className="flex items-center gap-2 bg-day-100 dark:bg-night-500 rounded-md p-2"
      to={props.id}
    >
      <IconArchiveFilled className="w-4 h-4" />

      {props.displayName}
    </Link>
  );
};

export default WordlistCard;
