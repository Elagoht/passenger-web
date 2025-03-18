import { IconPalette, IconTag } from "@tabler/icons-react";
import { Form, Formik } from "formik";
import { createElement, FC } from "react";
import TagBadge from "../components/common/TagBadge";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Subtitle } from "../components/ui/Typography";
import tags from "../data/icons";
import { createTagSchema } from "../lib/validation/tag";
import { patchTagUpdate, postTagAdd } from "../services/tags";
import useAuthStore from "../stores/auth";
import useDictStore from "../stores/dict";
import toastError from "../utilities/ToastError";

type TagFormProps = {
  onSubmitSuccess?: () => void;
} & (
  | { mode: "add"; initialValues?: never; id?: never; isPanic?: never }
  | {
      mode: "edit";
      initialValues: RequestTagAdd;
      id: string;
      isPanic?: boolean;
    }
);

const TagForm: FC<TagFormProps> = ({
  id,
  mode,
  isPanic,
  initialValues,
  onSubmitSuccess,
}) => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  return (
    <Formik<RequestTagAdd>
      initialValues={
        mode === "add"
          ? {
              name: "",
              color: "#7D839F",
              icon: 1,
            }
          : initialValues
      }
      validationSchema={createTagSchema(dict)}
      onSubmit={(values, { setSubmitting }) => {
        (mode === "add"
          ? postTagAdd(token, values)
          : patchTagUpdate(token, id, values)
        )
          .then(() => onSubmitSuccess?.())
          .catch((error) => toastError(error, dict))
          .finally(() => setSubmitting(false));
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12 w-full">
          <div className="flex flex-col gap-6">
            <Input
              icon={IconTag}
              name="name"
              label={dict.windows.addTag.form.name}
            />

            <Input
              icon={IconPalette}
              name="color"
              type="color"
              label={dict.windows.addTag.form.color}
            />

            <Subtitle>{dict.windows.addTag.form.iconDescription}</Subtitle>

            <div className="grid grid-cols-icons sm:gap-4 gap-2">
              {tags.map((tag, index) => (
                <Button
                  key={index}
                  variant={values.icon === index ? "solid" : "outlined"}
                  size="small"
                  color="secondary"
                  className="flex items-center justify-center aspect-square
                  rounded-full"
                  onClick={() => setFieldValue("icon", index)}
                >
                  {createElement(tag, { size: 48 })}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Subtitle>{dict.windows.addTag.form.preview}</Subtitle>

            <div className="flex justify-center my-auto">
              <TagBadge
                size="preview"
                color={values.color}
                name={values.name}
                icon={values.icon}
                isPanic={isPanic}
              />
            </div>

            <Button type="submit" className="w-full">
              {dict.windows.addTag.form.save}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TagForm;
