import { FC } from "react";

const TagBadge: FC<Pick<Tag, "color" | "icon">> = ({ color, icon }) => {
  return (
    <div
      className="grid place-items-center gap-2 w-7 h-7 rounded-md"
      style={{ backgroundColor: color, color: getContrastColor(color) }}
    >
      {tags[icon]}
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

const tags: Record<number, string> = {
  1: "🔑",
  2: "🔒",
  3: "🔐",
  4: "🔥",
};

export default TagBadge;
