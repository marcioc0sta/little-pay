import { Account } from '../../../types'
import { Event } from '../types/Event.type'
import EventResponse from '../types/EventResponse.type'

function createOrUpdate(
  accounts: Array<Account>,
  event: Event,
  // eslint-disable-next-line no-unused-vars
  respond: (status: number, endpointResponse: EventResponse) => void
) {
  const { destination, amount } = event
  const destinationAccIdx = accounts.findIndex(acc => acc.id === destination)
  const acc = accounts[destinationAccIdx]
  const accHasBeenFound = destinationAccIdx !== -1

  if (accHasBeenFound) {
    const balance = acc.balance + amount

    accounts[destinationAccIdx] = {
      ...accounts[destinationAccIdx],
      balance,
    }

    respond(201, {
      destination: { id: destination, balance },
    })

    return accounts
  }

  accounts = [
    ...accounts,
    {
      id: destination,
      balance: amount,
    },
  ]

  respond(201, {
    destination: { id: destination, balance: amount },
  })

  return accounts
}

export default createOrUpdate
