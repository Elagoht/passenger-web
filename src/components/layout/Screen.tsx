import { FC, PropsWithChildren } from "react"

const Screen: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex h-screen mx-auto max-w-screen-lg flex-col p-4">
    {children}
  </div>
}

export default Screen