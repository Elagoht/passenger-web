import { FC } from "react";
import { Link } from "react-router-dom";
import useDictStore from "../../../stores/dict";
import Wordlister from "../../../utilities/Wordlister";
import { Paragraph } from "../../ui/Typography";

const WordlistCard: FC<WordlistCard> = (props) => {
  const { dict } = useDictStore();

  return (
    <Link
      to={`/tools/wordlists/details/${props.id}`}
      className="flex flex-col grow bg-day-100 dark:bg-night-400 rounded-2xl"
    >
      <div className="flex flex-col p-3">
        <strong>{props.displayName}</strong>

        <Paragraph className="text-sm">{props.description}</Paragraph>
      </div>

      {Wordlister.generateStatus(props.status, dict)}

      {Wordlister.generateInfoCards(props)}
    </Link>
  );
};

export default WordlistCard;
