import { FC } from "react";
import Container from "../../../components/layout/Container";
import useDictStore from "../../../stores/dict";

const ToolsWindow: FC = () => {
  const { dict } = useDictStore();

  return (
    <Container>
      <h1>{dict.windows.tools.title}</h1>
      <ul>
        {dict.windows.tools.items.map((item) => (
          <li key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ToolsWindow;
