import classNames from "classnames"
import { FC, PropsWithChildren } from "react"

type ContainerProps = React.HTMLAttributes<HTMLDivElement>

const Container: FC<PropsWithChildren<ContainerProps>> = ({
  children, ...props
}) => {
  return <div
    {...props}
    className={classNames(
      "flex flex-col items-center justify-center h-screen p-6 fade-in",
      props.className
    )}
  >
    {children}
  </div>
}

export default Container