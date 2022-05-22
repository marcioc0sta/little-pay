import { Response } from 'express'

import { CustomRequest } from '../../interfaces'
import { Account } from '../../types'

import createOrUpdateAcc from './createOrUpdateAcc'
import { Event } from './types/Event.type'
import withdrawals from './withdraw'

function eventHandler(
  accounts: Array<Account>,
  req: CustomRequest<Event>,
  res: Response
) {
  const eventDispatchers = {
    deposit: createOrUpdateAcc,
    withdraw: withdrawals, // TODO: handle withdrawals
    transfer: () => accounts, // TODO: handle transfers
  }

  return eventDispatchers[req.body.type](accounts, req, res)
}

export default eventHandler
