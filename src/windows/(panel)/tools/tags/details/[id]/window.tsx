import { IconLoader } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Container from "../../../../../../components/layout/Container";
import { Subtitle, Title } from "../../../../../../components/ui/Typography";
import TagForm from "../../../../../../forms/TagForm";
import { getTag } from "../../../../../../services/tags";
import useAuthStore from "../../../../../../stores/auth";
import useDictStore from "../../../../../../stores/dict";

const TagDetailsWindow: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const { id } = useParams();
  const navigate = useNavigate();

  const [tag, setTag] = useState<Tag | null>(null);

  useEffect(() => {
    if (!id) return;
    getTag(token, id).then(setTag);
  }, [id, token]);

  if (!tag || !id)
    return (
      <Container>
        <IconLoader className="animate-spin" />
      </Container>
    );

  return (
    <Container className="flex flex-col gap-4">
      <Title className="text-2xl font-bold">
        {dict.windows.tagDetails.title}
      </Title>

      <Subtitle>{dict.windows.tagDetails.description}</Subtitle>

      <TagForm
        mode="edit"
        id={id}
        initialValues={{
          name: tag.name,
          color: tag.color,
          icon: tag.icon,
        }}
        onSubmitSuccess={() => navigate("/tools/tags")}
      />
    </Container>
  );
};

export default TagDetailsWindow;
