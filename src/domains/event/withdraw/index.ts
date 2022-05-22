import { CustomRequest } from '../../../interfaces'
import { Account } from '../../../types'
import { Event } from '../types/Event.type'
import EventResponse from '../types/EventResponse.type'

function withdrawals(
  accounts: Array<Account>,
  req: CustomRequest<Event>,
  // eslint-disable-next-line no-unused-vars
  respond: (status: number, endpointResponse: EventResponse | string) => void
) {
  const { origin, amount } = req.body
  const originAccIdx = accounts.findIndex(acc => acc.id === origin)
  const accNotFound = originAccIdx === -1

  if (accNotFound) {
    respond(404, '0')
    return accounts
  }

  const accBalance = accounts[originAccIdx].balance
  const updatedBalance = accBalance - amount

  accounts[originAccIdx] = {
    ...accounts[originAccIdx],
    balance: updatedBalance,
  }

  respond(201, { origin: { id: origin ?? '', balance: updatedBalance } })

  return accounts
}

export default withdrawals
