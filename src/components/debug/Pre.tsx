import { useFormikContext } from "formik";
import { FC } from "react";
import Environment from "../../utilities/Environment";

type PreProps = {
  data?: unknown;
};

const Pre: FC<PreProps> = ({ data }) => {
  // If is on a formik context, use the formik values
  const { values } = useFormikContext();

  if (Environment.DEV) {
    return (
      <pre className="bg-night-500 text-day-200 p-4 text-left rounded-lg">
        {JSON.stringify(data ?? values, null, 2)}
      </pre>
    );
  }

  return null;
};

export default Pre;
