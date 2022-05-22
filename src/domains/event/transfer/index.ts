import { Account } from '../../../types'
import { Event } from '../types/Event.type'
import EventResponse from '../types/EventResponse.type'

function transfers(
  accounts: Array<Account>,
  event: Event,
  // eslint-disable-next-line no-unused-vars
  respond: (status: number, endpointResponse: EventResponse | string) => void
) {
  const { origin, amount, destination } = event
  const orgnAccIdx = accounts.findIndex(acc => acc.id === origin)
  const dstAccIdx = accounts.findIndex(acc => acc.id === destination)
  const orgnNotFound = orgnAccIdx === -1
  const dstNotFound = dstAccIdx === -1

  if (orgnNotFound) {
    respond(404, '0')
    return accounts
  }

  const orgnUpdatedBalance = accounts[orgnAccIdx].balance - amount

  const operateAccBalance = (accIdx: number, updatedBalance: number): void => {
    accounts[accIdx] = {
      ...accounts[accIdx],
      balance: updatedBalance,
    }
  }

  const createDstAccount = (): void => {
    accounts = [
      ...accounts,
      {
        id: destination,
        balance: amount,
      },
    ]
  }

  if (dstNotFound) {
    operateAccBalance(orgnAccIdx, orgnUpdatedBalance)
    createDstAccount()

    respond(201, {
      origin: { id: origin ?? '', balance: orgnUpdatedBalance },
      destination: { id: destination, balance: amount },
    })

    return accounts
  }

  operateAccBalance(orgnAccIdx, orgnUpdatedBalance)
  operateAccBalance(dstAccIdx, accounts[dstAccIdx].balance + amount)

  respond(201, {
    origin: {
      id: origin ?? '',
      balance: accounts[orgnAccIdx].balance - amount,
    },
    destination: {
      id: destination,
      balance: accounts[dstAccIdx].balance + amount,
    },
  })

  return accounts
}

export default transfers
