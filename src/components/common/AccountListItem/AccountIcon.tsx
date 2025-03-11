import { FC, useCallback } from 'react'

const AccountIcon: FC<Pick<AccountCard, "icon" | "name">> = ({
  icon, name
}) => {
  const getInitials = useCallback((name: string): string => {
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("")
  }, [])

  return icon ? <img
    src={icon}
    alt={name}
    className="w-16 h-16 shrink-0 rounded-full"
  /> : <div className="w-16 h-16 shrink-0 rounded-full bg-day-400 dark:bg-night-500 text-day-950 dark:text-day-950
    flex items-center justify-center font-semibold text-2xl">
    {getInitials(name)}
  </div>
}

export default AccountIcon