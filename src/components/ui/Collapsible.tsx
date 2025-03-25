import classNames from "classnames";
import { FC } from "react";
type CollapsibleProps = {
  children: React.ReactNode;
  open: boolean;
  outerClassName?: string;
  innerClassName?: string;
};

const Collapsible: FC<CollapsibleProps> = ({
  children,
  open,
  outerClassName,
  innerClassName,
}) => {
  return (
    <div
      className={classNames(
        "grid transition-all duration-300 ease-in-out",
        outerClassName,
      )}
      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
    >
      <div className={classNames("overflow-hidden", innerClassName)}>
        {children}
      </div>
    </div>
  );
};

export default Collapsible;
