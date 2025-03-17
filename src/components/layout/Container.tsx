import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

const Container: FC<PropsWithChildren<ContainerProps>> = ({
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classNames(
        "flex flex-col items-center justify-center",
        "p-2 md:p-6 mb-6 fade-in w-full",
        props.className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
