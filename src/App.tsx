import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getIsInitialized } from './services/auth'
import AccountsWindow from './windows/accounts/window'

const App: FC<PropsWithChildren> = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>()
  useEffect(() => {
    const fetchIsInitialized = async () => {
      const response = await getIsInitialized()
      setIsInitialized(response.initialized)
    }
    fetchIsInitialized()
  }, [])

  return <pre>{JSON.stringify(isInitialized, null, 2)}</pre>

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<AccountsWindow />} />
    </Routes>
  </BrowserRouter>
}

export default App