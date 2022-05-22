import { Account } from '../../types'

import createOrUpdateAcc from './createOrUpdateAcc'
import transfers from './transfer'
import { Event } from './types/Event.type'
import EventResponse from './types/EventResponse.type'
import withdrawals from './withdraw'

function eventHandler(
  accounts: Array<Account>,
  event: Event,
  // eslint-disable-next-line no-unused-vars
  respond: (status: number, endpointResponse: EventResponse | string) => void
) {
  const eventDispatchers = {
    deposit: createOrUpdateAcc,
    withdraw: withdrawals,
    transfer: transfers,
  }

  return eventDispatchers[event.type](accounts, event, respond)
}

export default eventHandler
