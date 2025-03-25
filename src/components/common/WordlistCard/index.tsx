import {
  IconCalendar,
  IconDownload,
  IconDownloadOff,
  IconLock,
  IconRosetteDiscountCheck,
  IconTrash,
  IconWeight,
} from "@tabler/icons-react";
import classNames from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";
import {
  deleteWordlist,
  postWordlistCancelDownload,
  postWordlistDownload,
  postWordlistValidate,
} from "../../../services/wordlists";
import useAuthStore from "../../../stores/auth";
import useDictStore from "../../../stores/dict";
import Button from "../../ui/Button";
import { Paragraph } from "../../ui/Typography";

const WordlistCard: FC<WordlistCard> = (props) => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();
  return (
    <div className="grow flex flex-col items-start justify-between bg-day-100 dark:bg-night-400 rounded-2xl">
      <Link to={props.id} className="flex flex-col grow gap-2 p-3">
        <strong>{props.displayName}</strong>

        <Paragraph className="text-sm mb-2">{props.description}</Paragraph>

        <div className="flex flex-wrap gap-2">{generateInfoCards(props)}</div>
      </Link>

      <div className="flex mt-0 w-full">
        {generateStatus(props.status, dict)}

        {generateActionButton(token, props, dict)}
      </div>
    </div>
  );
};

const generateStatus = (status: WordlistStatus, dict: Dict) => {
  return (
    <strong
      className={classNames(
        "flex-1 grid place-items-center bg-opacity-30 rounded-bl-2xl",
        {
          "bg-amber-500 text-amber-500": status === "IMPORTED",
          "bg-indigo-500 text-indigo-500": status === "DOWNLOADING",
          "bg-blue-500 text-blue-500": status === "DOWNLOADED",
          "bg-pink-500 text-pink-500": status === "VALIDATING",
          "bg-dream-500 text-dream-500": status === "VALIDATED",
          "bg-green-500 text-green-500": status === "ANALYZING",
          "bg-red-500 text-red-500": status === "FAILED",
        },
      )}
    >
      {dict.windows.wordLists.status[status] || status}
    </strong>
  );
};

const generateActionButton = (
  token: string,
  wordlist: WordlistCard,
  dict: Dict,
) => {
  if (wordlist.status === "VALIDATING" || wordlist.status === "ANALYZING") {
    return null;
  }

  const props = {
    IMPORTED: {
      icon: IconDownload,
      color: "success",
      label: dict.windows.wordLists.actions.download,
      onClick: () => postWordlistDownload(token, wordlist.id),
    },
    DOWNLOADING: {
      icon: IconDownloadOff,
      color: "danger",
      label: dict.windows.wordLists.actions.cancelDownload,
      onClick: () => postWordlistCancelDownload(token, wordlist.id),
    },
    DOWNLOADED: {
      icon: IconRosetteDiscountCheck,
      color: "info",
      label: dict.windows.wordLists.actions.validate,
      onClick: () => postWordlistValidate(token, wordlist.id),
    },
    VALIDATED: {
      icon: IconTrash,
      color: "danger",
      label: dict.windows.wordLists.actions.delete,
      onClick: () => deleteWordlist(token, wordlist.id),
    },
    FAILED: {
      icon: IconRosetteDiscountCheck,
      color: "danger",
      label: dict.windows.wordLists.actions.validate,
      onClick: () => postWordlistValidate(token, wordlist.id),
    },
  } as const;

  return (
    <Button
      color={props[wordlist.status].color}
      className="flex-1 border-l-0 rounded-l-none rounded-t-none"
      onClick={props[wordlist.status].onClick}
      solidIcon
      icon={props[wordlist.status].icon}
    >
      {props[wordlist.status].label}
    </Button>
  );
};

const generateInfoCards = (wordlist: WordlistCard) => {
  const infoCards = [
    {
      icon: <IconLock />,
      value: Intl.NumberFormat().format(wordlist.totalPasswords),
    },
    {
      icon: <IconCalendar />,
      value: wordlist.year,
    },
    {
      icon: <IconWeight />,
      value: `${wordlist.size} ${wordlist.sizeUnits}`,
    },
  ];

  return infoCards.map((infoCard) => (
    <div className="flex items-center max-md:grow gap-2 bg-day-200 dark:bg-night-500 rounded-md p-2">
      {infoCard.icon}

      {infoCard.value}
    </div>
  ));
};

export default WordlistCard;
