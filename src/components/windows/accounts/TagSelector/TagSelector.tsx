import classNames from "classnames";
import { useFormikContext } from "formik";
import { FC, useEffect, useState } from "react";
import { getTags } from "../../../../services/tags";
import useAuthStore from "../../../../stores/auth";
import useDictStore from "../../../../stores/dict";
import toastError from "../../../../utilities/ToastError";
import TagBadge from "../../../common/TagBadge";
import { Paragraph } from "../../../ui/Typography";

const TagSelector: FC = () => {
  const { token } = useAuthStore();
  const { dict } = useDictStore();

  const fields = useFormikContext<Account>();

  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    getTags(token)
      .then((tags) => setTags(tags))
      .catch((error) => toastError(error, dict));
  }, [dict, token]);

  return (
    <>
      <Paragraph className="ml-4">
        {dict.windows.addAccount.form.tags}
      </Paragraph>
      <div>
        {tags?.map((tag) => (
          <button
            type="button"
            key={tag.id}
            className={classNames("transition-all", {
              "grayscale scale-75": !fields.values.tags?.some(
                (t) => t.id === tag.id,
              ),
            })}
            onClick={() => {
              fields.setFieldValue(
                "tags",
                fields.values.tags?.some((t) => t.id === tag.id)
                  ? fields.values.tags?.filter((t) => t.id !== tag.id)
                  : [...(fields.values.tags || []), tag],
              );
            }}
          >
            <TagBadge {...tag} size="small" />
          </button>
        ))}
      </div>
    </>
  );
};

export default TagSelector;
