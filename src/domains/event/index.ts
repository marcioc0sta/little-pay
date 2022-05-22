import { CustomRequest } from '../../interfaces'
import { Account } from '../../types'

import createOrUpdateAcc from './createOrUpdateAcc'
import transfers from './transfer'
import { Event } from './types/Event.type'
import EventResponse from './types/EventResponse.type'
import withdrawals from './withdraw'

function eventHandler(
  accounts: Array<Account>,
  req: CustomRequest<Event>,
  // eslint-disable-next-line no-unused-vars
  respond: (status: number, endpointResponse: EventResponse | string) => void
) {
  const eventDispatchers = {
    deposit: createOrUpdateAcc,
    withdraw: withdrawals,
    transfer: transfers,
  }

  return eventDispatchers[req.body.type](accounts, req, respond)
}

export default eventHandler
