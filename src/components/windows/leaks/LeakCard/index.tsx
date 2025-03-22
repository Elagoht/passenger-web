import {
  IconCalendar,
  IconCircleCheck,
  IconExternalLink,
  IconHash,
  IconHelpCircle,
} from "@tabler/icons-react";
import classNames from "classnames";
import { FC } from "react";
import useDictStore from "../../../../stores/dict";

const LeakCard: FC<Leak> = (props) => {
  const { dict } = useDictStore();

  return (
    <div
      className="bg-day-100 dark:bg-night-500 rounded-lg p-2
      shadow-md flex flex-col"
    >
      <strong>{getTitle(props.title, props.name)}</strong>

      {props.domain && (
        <a
          href={new URL(`https://${props.domain}`).toString()}
          className="flex items-center gap-2 text-blue-500
          visited:text-purple-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconExternalLink /> {props.domain}
        </a>
      )}

      <div className="grid grid-cols-3 gap-2 mt-2">
        <time
          className="flex flex-col items-center bg-day-200
          dark:bg-night-600 rounded-lg p-2"
        >
          <IconCalendar />
          {props.date}
        </time>

        <span
          className="flex flex-col items-center bg-day-200
          dark:bg-night-600 rounded-lg p-2"
        >
          <IconHash />
          {props.pwnCount}
        </span>

        <span
          className={classNames(
            "flex flex-col items-center bg-day-200",
            "dark:bg-night-600 rounded-lg p-2 text-red-500",
            { grayscale: !props.verified },
          )}
        >
          {props.verified ? (
            <>
              <IconCircleCheck /> {dict.windows.leaks.verified}
            </>
          ) : (
            <>
              <IconHelpCircle /> {dict.windows.leaks.unverified}
            </>
          )}
        </span>
      </div>
    </div>
  );
};

const getTitle = (title: string, name: string) => {
  if (title === name) return title;
  return `${title} (${name})`;
};

export default LeakCard;
