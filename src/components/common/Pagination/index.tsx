import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { FC } from "react";
import Button from "../../ui/Button";

type PaginationProps = {
  total: number;
  current: number;
  onChange: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ total, current, onChange }) => {
  // Don't render pagination if there's only 1 page
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  // Show max 5 pages with current page in the middle when possible
  const getVisiblePages = () => {
    if (total <= 5) return pages;

    if (current <= 3) return pages.slice(0, 5);
    if (current >= total - 2) return pages.slice(total - 5);

    return pages.slice(current - 3, current + 2);
  };

  return (
    <div className="flex flex-wrap items-center justify-center sm:gap-1">
      <Button
        size="small"
        className="size-9 !p-0 grid place-items-center"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        <IconChevronLeft />
      </Button>

      {getVisiblePages().map((page) => (
        <Button
          key={page}
          size="small"
          className="size-9 !p-0 grid place-items-center"
          color={page === current ? "secondary" : "primary"}
          onClick={() => onChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        size="small"
        className="size-9 !p-0 grid place-items-center"
        disabled={current === total}
        onClick={() => onChange(current + 1)}
      >
        <IconChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
