import classNames from 'classnames'
import { FC } from 'react'

type BrandingProps = {
  size?: "small" | "medium" | "large"
  className?: string
}

const Branding: FC<BrandingProps> = ({
  size = "medium",
  className
}) => {
  return <figure className={classNames(
    "flex flex-col items-center", className
  )}>
    <img
      src="/android-chrome-512x512.png"
      alt="logo"
      className={classNames({
        "w-24 h-24": size === "small",
        "w-40 h-40": size === "medium",
        "w-64 h-64": size === "large",
      })}
    />
  </figure>
}

export default Branding