import { FC, PropsWithChildren } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AccountsWindow from './windows/accounts/page'

const App: FC<PropsWithChildren> = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<AccountsWindow />} />
    </Routes>
  </BrowserRouter>
}

export default App