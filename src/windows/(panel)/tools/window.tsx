import { IconChevronRight } from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import Container from "../../../components/layout/Container";
import { Title } from "../../../components/ui/Typography";
import useDictStore from "../../../stores/dict";

const ToolsWindow: FC = () => {
  const { dict } = useDictStore();

  return (
    <Container>
      <Title className="mb-6">{dict.windows.tools.title}</Title>

      <ul className="flex flex-col gap-2 w-full">
        {Object.entries(dict.windows.tools.items).map(([key, item]) => (
          <Link
            to={key}
            key={key}
            className="flex items-center justify-between gap-2
            p-2 rounded-md bg-day-300 dark:bg-night-800
            hover:bg-day-400 dark:hover:bg-night-900"
          >
            <li className="flex flex-col">
              <strong>{item.title}</strong>

              <small>{item.description}</small>
            </li>

            <IconChevronRight size={32} />
          </Link>
        ))}
      </ul>
    </Container>
  );
};

export default ToolsWindow;
