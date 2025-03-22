import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

type TypographyProps = PropsWithChildren<{
  className?: string;
}>;

export const Title: FC<TypographyProps> = ({ children, className }) => {
  return (
    <h1 className={classNames("text-4xl font-bold", className)}>{children}</h1>
  );
};

export const Subtitle: FC<TypographyProps> = ({ children, className }) => {
  return (
    <h2 className={classNames("text-xl font-medium", className)}>{children}</h2>
  );
};

export const Paragraph: FC<TypographyProps> = ({ children, className }) => {
  return <p className={classNames("text-base", className)}>{children}</p>;
};

export const Small: FC<TypographyProps> = ({ children, className }) => {
  return <p className={classNames("text-sm", className)}>{children}</p>;
};
