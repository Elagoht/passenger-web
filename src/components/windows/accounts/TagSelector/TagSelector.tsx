import { IconCheck } from "@tabler/icons-react";
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
            className={classNames("transition-all relative", {
              "grayscale scale-75 opacity-50": !fields.values.tags?.some(
                (currentTag) => currentTag.id === tag.id,
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
            {fields.values.tags?.some(
              (currentTag) => currentTag.id === tag.id,
            ) && (
              <IconCheck
                size={16}
                className="bg-green-500 text-green-50 rounded
                absolute -top-1 right-2.5"
              />
            )}

            <TagBadge {...tag} size="small" />
          </button>
        ))}
      </div>
    </>
  );
};

export default TagSelector;
