import { FC } from "react";
import { useNavigate } from "react-router";
import Container from "../../../../../components/layout/Container";
import { Title } from "../../../../../components/ui/Typography";
import TagForm from "../../../../../forms/TagForm";
import useDictStore from "../../../../../stores/dict";

const TagAddWindow: FC = () => {
  const { dict } = useDictStore();

  const navigate = useNavigate();

  return (
    <Container>
      <Title className="text-2xl font-bold">{dict.windows.addTag.title}</Title>

      <TagForm mode="add" onSubmitSuccess={() => navigate("/tools/tags")} />
    </Container>
  );
};

export default TagAddWindow;
