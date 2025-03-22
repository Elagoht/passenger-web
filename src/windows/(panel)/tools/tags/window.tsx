import { IconPlus } from "@tabler/icons-react";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TagListItem from "../../../../components/common/TagListItem";
import Container from "../../../../components/layout/Container";
import Button from "../../../../components/ui/Button";
import {
  Paragraph,
  Subtitle,
  Title,
} from "../../../../components/ui/Typography";
import { getTags } from "../../../../services/tags";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";
import toastError from "../../../../utilities/ToastError";

const TagsWindow: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const navigate = useNavigate();

  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    getTags(token)
      .then((tags) => setTags(tags))
      .catch((error) => toastError(error, dict));
  }, [dict, token]);

  return (
    <Container className="gap-4">
      <Title>{dict.windows.tags.title}</Title>

      <Subtitle>{dict.windows.tags.description}</Subtitle>

      <Button
        color="success"
        onClick={() => navigate("/tools/tags/add")}
        className="self-end flex items-center gap-2"
      >
        <IconPlus size={24} />
      </Button>

      <div
        className={classNames(
          "gap-4 bg-day-300 dark:bg-night-800",
          "p-6 rounded-md w-full shadow-inner",
          {
            "flex flex-col gap-3 text-center": tags.length === 0,
            "grid grid-cols-tags": tags.length > 0,
          },
        )}
      >
        {tags.length === 0 ? (
          <Paragraph>{dict.windows.tags.noTags}</Paragraph>
        ) : (
          tags.map((tag) => <TagListItem key={tag.id} {...tag} />)
        )}
      </div>
    </Container>
  );
};

export default TagsWindow;
