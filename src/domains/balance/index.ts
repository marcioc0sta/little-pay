import { Account } from '../../types'

function getBalance(
  accounts: Array<Account>,
  account_id: string,
  // eslint-disable-next-line no-unused-vars
  respond: (status: number, endpointResponse: string) => void
) {
  const accountFound = accounts.find(acc => acc.id === account_id)

  if (!accountFound) {
    respond(404, '0')
    return
  }

  respond(200, `${accountFound.balance}`)
}

export default getBalance
