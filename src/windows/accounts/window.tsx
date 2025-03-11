import { FC, useEffect, useState } from "react"
import AccountListItem from "../../components/common/AccountListItem"
import Screen from "../../components/layout/Screen"
import { getAccounts } from "../../services/accounts"

const AccountsWindow: FC = () => {
  const [accounts, setAccounts] = useState<AccountCard[]>([])

  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await getAccounts()
      setAccounts(accounts)
    }
    fetchAccounts()
  }, [])

  if (accounts.length === 0) {
    return <Screen>
      <h1>Passphrases</h1>

      <p>No accounts found</p>
    </Screen>
  }

  return <Screen>
    <h1>Passphrases</h1>

    <div className="flex flex-wrap gap-2">
      {accounts.map((account) =>
        <AccountListItem
          key={account.id}
          id={account.id}
          icon={account.icon}
          name={account.name}
          identity={account.identity}
          tags={account.tags}
        />
      )}
    </div>
  </Screen>
}

export default AccountsWindow