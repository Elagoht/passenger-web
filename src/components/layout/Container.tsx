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
        "flex flex-col items-center justify-center max-w-screen-xl",
        "p-4 md:p-6 mb-6 fade-in w-full mx-auto",
        props.className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
