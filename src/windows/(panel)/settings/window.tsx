import { IconChevronRight } from "@tabler/icons-react";
import { createElement, FC } from "react";
import { Link } from "react-router-dom";
import Container from "../../../components/layout/Container";
import { Title } from "../../../components/ui/Typography";
import useDictStore from "../../../stores/dict";
import classNames from "classnames";

const SettingsWindow: FC = () => {
  const { dict } = useDictStore();

  return (
    <Container>
      <Title className="mb-6">{dict.windows.settings.title}</Title>

      <ul className="flex flex-col gap-2 w-full">
        {Object.entries(dict.windows.settings.items).map(([key, item]) =>
          createElement(
            item.soon ? "div" : Link,
            {
              to: key,
              key,
              className: classNames(
                "flex items-center justify-between gap-2 p-2 rounded-md bg-day-300 dark:bg-night-800",
                {
                  "cursor-not-allowed": item.soon,
                  "hover:bg-day-400 dark:hover:bg-night-900": !item.soon,
                }
              ),
            },
            <>
              <li className="flex flex-col">
                <strong>{item.title}</strong>

                <small>{item.description}</small>
              </li>

              {item.soon ? (
                <span className="text-sm text-right text-cream-500">
                  {dict.windows.tools.soon}
                </span>
              ) : (
                <IconChevronRight size={32} />
              )}
            </>
          )
        )}
      </ul>
    </Container>
  );
};

export default SettingsWindow;
