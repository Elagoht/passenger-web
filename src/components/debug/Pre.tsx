import { useFormikContext } from "formik";
import { FC } from "react";

type PreProps = {
  data?: unknown;
};

const Pre: FC<PreProps> = ({ data }) => {
  // If is on a formik context, use the formik values
  const { values } = useFormikContext();

  return (
    <pre className="bg-night-500 text-day-200 p-4 text-left rounded-lg">
      {JSON.stringify(data ?? values, null, 2)}
    </pre>
  );
};

export default Pre;
