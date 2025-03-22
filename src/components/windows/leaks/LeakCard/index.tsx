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
          className="flex items-center gap-1 text-blue-500
          visited:text-purple-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconExternalLink /> {props.domain}
        </a>
      )}

      <div className="flex gap-2 mt-2">
        <div className="flex flex-col grow items-stretch gap-1">
          <time
            className="flex items-center bg-day-200
          dark:bg-night-600 rounded-lg p-1 gap-1"
          >
            <IconCalendar />
            {props.date}
          </time>

          <span
            className="flex items-center bg-day-200
          dark:bg-night-600 rounded-lg p-1 gap-1"
          >
            <IconHash />
            {props.pwnCount}
          </span>
        </div>

        <div
          className={classNames(
            "flex flex-col justify-center items-center bg-day-200",
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
        </div>
      </div>
    </div>
  );
};

const getTitle = (title: string, name: string) => {
  if (title === name) return title;
  return `${title} (${name})`;
};

export default LeakCard;
