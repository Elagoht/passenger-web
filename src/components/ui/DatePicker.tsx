import { IconCalendar, IconCalendarDown, IconX } from "@tabler/icons-react";
import classNames from "classnames";
import { useField } from "formik";
import { FC, useEffect, useMemo, useState } from "react";
import { Combobox } from "./Combobox";

interface DatePickerProps {
  name: string;
  label?: string;
  error?: string;
}

export const DatePicker: FC<DatePickerProps> = ({ name, label, error }) => {
  const [field] = useField(name);
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleGoToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    handleDateSelect(today);
  };

  const handleClear = (event: React.MouseEvent) => {
    event.stopPropagation();
    field.onChange({
      target: {
        name,
        value: "",
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const selectedDate = useMemo(() => {
    if (!field.value) return null;
    const [year, month, day] = field.value.split("-");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }, [field.value]);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDay = firstDayOfMonth.getDay();

  const days = useMemo(() => {
    const daysArray = [];
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    // Add days from previous month
    for (let i = startingDay - 1; i >= 0; i--) {
      daysArray.push({
        date: new Date(currentYear, currentMonth - 1, prevMonthDays - i),
        isCurrentMonth: false,
        isSelected: false,
      });
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      daysArray.push({
        date,
        isCurrentMonth: true,
        isSelected: selectedDate?.toDateString() === date.toDateString(),
      });
    }

    // Add days from next month
    const remainingDays = 42 - daysArray.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push({
        date: new Date(currentYear, currentMonth + 1, i),
        isCurrentMonth: false,
        isSelected: false,
      });
    }

    return daysArray;
  }, [currentYear, currentMonth, startingDay, daysInMonth, selectedDate]);

  const monthNames = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      value: String(i),
      label: new Date(2000, i).toLocaleString("default", { month: "long" }),
    }));
  }, []);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => ({
      value: String(currentYear - i),
      label: String(currentYear - i),
    }));
  }, []);

  const handleDateSelect = (date: Date) => {
    // Format date as YYYY-MM-DD without timezone conversion
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    field.onChange({
      target: {
        name,
        value: formattedDate,
      },
    } as React.ChangeEvent<HTMLInputElement>);
    setIsOpen(false);
  };

  const handleMonthChange = (month: number) => {
    setCurrentDate(new Date(currentYear, month));
  };

  const handleYearChange = (year: number) => {
    setCurrentDate(new Date(year, currentMonth));
  };

  const displayValue = selectedDate
    ? selectedDate.toLocaleDateString("default", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-medium text-night-900 dark:text-day-200">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className="w-full px-3 py-2 rounded-2xl bg-day-100 dark:bg-night-400 text-night-900 dark:text-day-200 transition-all outline-none focus:ring-2 ring-dream-600 cursor-pointer flex items-center gap-3"
          onClick={() => setIsOpen(!isOpen)}
          tabIndex={0}
        >
          <IconCalendar size={20} className="shrink-0" />
          <span className="font-medium flex-1">
            {displayValue || "--/--/----"}
          </span>
          {field.value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-day-300 dark:hover:bg-night-300 rounded-lg transition-colors"
            >
              <IconX size={16} />
            </button>
          )}
        </div>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-80 bg-day-100 dark:bg-night-400 rounded-2xl shadow-lg border border-day-300 dark:border-night-300 p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-3 flex-1">
                  <Combobox
                    name="month"
                    options={monthNames}
                    value={String(currentMonth)}
                    onChange={(e) =>
                      handleMonthChange(parseInt(e.target.value))
                    }
                    className="flex-1"
                  />
                  <Combobox
                    name="year"
                    options={years}
                    value={String(currentYear)}
                    onChange={(event) =>
                      handleYearChange(parseInt(event.target.value))
                    }
                    className="flex-1"
                  />
                </div>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleGoToToday();
                  }}
                  className="ml-3 p-2 rounded-xl hover:bg-day-300 dark:hover:bg-night-300 transition-colors"
                >
                  <IconCalendarDown />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-night-700 dark:text-day-300"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  <button
                    key={index}
                    className={classNames(
                      "aspect-square rounded-xl text-base font-medium flex items-center justify-center transition-colors",
                      {
                        "text-night-500 dark:text-day-500 opacity-50 cursor-not-allowed":
                          !day.isCurrentMonth,
                        "text-night-900 dark:text-day-200 hover:bg-day-300 dark:hover:bg-night-300 cursor-pointer":
                          day.isCurrentMonth && !day.isSelected,
                        "bg-dream-600 text-white cursor-pointer":
                          day.isSelected,
                      },
                    )}
                    onClick={() => handleDateSelect(day.date)}
                    disabled={!day.isCurrentMonth}
                  >
                    {day.date.getDate()}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
