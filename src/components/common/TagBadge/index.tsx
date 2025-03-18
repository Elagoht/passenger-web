import classNames from "classnames";
import { createElement, FC } from "react";
import tags from "../../../data/icons";

type TagBadgeProps = Pick<Tag, "color" | "icon" | "isPanic"> & {
  size?: "xsmall" | "small" | "medium" | "large" | "preview";
  name?: Tag["name"];
};

const TagBadge: FC<TagBadgeProps> = ({
  color,
  icon,
  size = "medium",
  name,
  isPanic,
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <figure
        className={classNames("w-fit gap-2 rounded-md p-1", {
          "outline-2 outline-dashed": isPanic,
        })}
        style={{
          backgroundColor: color,
          color: getContrastColor(color),
          outlineColor: isPanic ? getContrastColor(color) : undefined,
        }}
      >
        {createElement(tags[icon], {
          className: classNames({
            "w-3 h-3": size === "xsmall",
            "w-4 h-4": size === "small",
            "w-6 h-6": size === "medium",
            "w-8 h-8": size === "large",
            "w-24 h-24": size === "preview",
          }),
        })}
      </figure>

      {name && (
        <figcaption
          className={classNames({
            "text-xs w-14 truncate": size === "xsmall",
            "text-sm w-14 truncate": size === "small",
            "text-base w-16 truncate": size === "medium",
            "text-lg w-20 truncate": size === "large",
            "text-2xl w-32 truncate": size === "preview",
          })}
        >
          {name}
        </figcaption>
      )}
    </div>
  );
};

const getContrastColor = (color: string) => {
  const rgb = color.match(/^#([0-9a-f]{6})$/i)?.[1];
  if (!rgb) return "#000";

  const r = parseInt(rgb.slice(0, 2), 16);
  const g = parseInt(rgb.slice(2, 4), 16);
  const b = parseInt(rgb.slice(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000" : "#fff";
};

export default TagBadge;
