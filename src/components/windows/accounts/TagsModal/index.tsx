import { IconPlus } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getTags } from "../../../../services/tags";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";
import toastError from "../../../../utilities/ToastError";
import BottomSheet from "../../../common/BottomSheet";
import TagListItem from "../../../common/TagListItem";
import Button from "../../../ui/Button";
import { Paragraph, Subtitle } from "../../../ui/Typography";

type TagsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const TagsModal: FC<TagsModalProps> = ({ isOpen, onClose }) => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const navigate = useNavigate();

  const [tags, setTags] = useState<Tag[]>();

  useEffect(() => {
    if (isOpen && typeof tags === "undefined") {
      getTags(token)
        .then((tags) => {
          setTags(tags);
          console.log(tags);
        })
        .catch((error) => toastError(error, dict));
    }
  }, [dict, isOpen, tags, token]);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-between gap-4">
        <Subtitle>{dict.windows.accounts.tagsModal.title}</Subtitle>

        <Button color="success" onClick={() => navigate("/tags/add")}>
          <IconPlus />
        </Button>
      </div>

      {tags?.length ? (
        <div className="grid grid-cols-tags gap-4 mt-4">
          {tags?.map((tag) => <TagListItem key={tag.id} {...tag} />)}
        </div>
      ) : (
        <Paragraph className="text-center">
          {dict.windows.accounts.tagsModal.noTags}
        </Paragraph>
      )}
    </BottomSheet>
  );
};

export default TagsModal;
