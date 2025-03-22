import { IconX } from "@tabler/icons-react";
import classNames from "classnames";
import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type BottomSheetProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

const THRESHOLD = 120;

const BottomSheet: FC<BottomSheetProps> = ({ children, isOpen, onClose }) => {
  const [dragPosition, setDragPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setDragPosition(0); // Reset position when opening
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    dragStartY.current = clientY;
  };

  const handleDragMove = (clientY: number) => {
    if (!isDragging) return;

    const delta = clientY - dragStartY.current;
    const newPosition = Math.max(0, delta); // Prevent dragging upwards
    setDragPosition(newPosition);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragPosition > THRESHOLD) {
      // Threshold to close
      onClose();
    }
    setDragPosition(0);
  };

  return createPortal(
    <div
      className={classNames(
        "fixed inset-0 bg-black bg-opacity-50 select-none",
        "backdrop-blur-sm transition-all duration-300 ease-in-out z-40",
        { "opacity-0 pointer-events-none": !isOpen },
      )}
    >
      <div
        ref={containerRef}
        onTouchStart={(event) => handleDragStart(event.touches[0].clientY)}
        onTouchMove={(event) => handleDragMove(event.touches[0].clientY)}
        onTouchEnd={handleDragEnd}
        onMouseDown={(event) => handleDragStart(event.clientY)}
        onMouseMove={(event) => handleDragMove(event.clientY)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onClick={(event) => event.stopPropagation()}
        className={classNames(
          "fixed inset-0 flex items-end md:items-center",
          "justify-center md:p-4 transition-all",
          { "opacity-0 pointer-events-none": !isOpen },
        )}
        style={{
          transition: isDragging ? "none" : "all 0.3s ease-in-out",
          transform: `translateY(${dragPosition}px)`,
          opacity: `calc(1 - ${dragPosition / 100})`,
        }}
      >
        <div
          className={classNames(
            "w-full relative max-w-lg bg-day-100 dark:bg-night-500",
            "rounded-t-2xl md:rounded-2xl md:p-6 p-4 select-text",
            { "opacity-0 pointer-events-none": !isOpen },
          )}
        >
          {/* Drag handle indicator */}
          <div
            className="w-12 h-1 bg-gray-300 rounded-full mx-auto
          mb-4 md:hidden"
          />

          {/* Close button for desktop   */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 max-md:hidden bg-red-500
            rounded-full p-1 text-red-50"
          >
            <IconX />
          </button>

          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default BottomSheet;
