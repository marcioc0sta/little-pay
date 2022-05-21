import { Account } from '../../types'

import { Event } from './types/Event.type'

function createOrUpdate(accounts: Array<Account>, event: Event) {
  const { destination, amount } = event
  const destinationAccIdx = accounts.findIndex(acc => acc.id === destination)

  // updated ecc
  if (destinationAccIdx !== -1) {
    accounts[destinationAccIdx] = {
      id: destination,
      balance: accounts[destinationAccIdx].balance + amount,
    }

    return accounts
  }

  // new acc
  accounts = [
    ...accounts,
    {
      id: destination,
      balance: amount,
    },
  ]

  return accounts
}

export { createOrUpdate }
