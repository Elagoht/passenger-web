import {
  Icon,
  IconBriefcase,
  IconCamera,
  IconDeviceGamepad,
  IconDeviceTv,
  IconGitFork,
  IconHeart,
  IconHeartHandshake,
  IconLock,
  IconProps,
  IconSchool,
  IconUrgent,
} from "@tabler/icons-react";
import classNames from "classnames";
import { createElement, FC } from "react";

type TagBadgeProps = Pick<Tag, "color" | "icon"> & {
  size?: "small" | "medium" | "large";
  name?: Tag["name"];
};

const TagBadge: FC<TagBadgeProps> = ({
  color,
  icon,
  size = "medium",
  name,
}) => {
  return (
    <div className="flex flex-col items-center w-fit">
      <div
        className="w-fit gap-2 rounded-md p-1"
        style={{ backgroundColor: color, color: getContrastColor(color) }}
      >
        {createElement(tags[icon], {
          className: classNames({
            "w-4 h-4": size === "small",
            "w-6 h-6": size === "medium",
            "w-8 h-8": size === "large",
          }),
        })}
      </div>

      {name && <small>{name}</small>}
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

const tags: Record<
  number,
  React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
> = {
  0: IconUrgent,
  1: IconHeart,
  2: IconLock,
  3: IconSchool,
  4: IconBriefcase,
  5: IconHeartHandshake,
  6: IconDeviceGamepad,
  7: IconGitFork,
  8: IconCamera,
  9: IconDeviceTv,
};

export default TagBadge;
