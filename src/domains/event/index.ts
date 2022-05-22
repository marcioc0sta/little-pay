import { Response } from 'express'

import { CustomRequest } from '../../interfaces'
import { Account } from '../../types'

import createOrUpdate from './createOrUpdate'
import { Event } from './types/Event.type'

function eventHandler(
  accounts: Array<Account>,
  req: CustomRequest<Event>,
  res: Response
) {
  const eventDispatchers = {
    deposit: createOrUpdate,
    withdraw: () => accounts, // TODO: handle withdrawals
    transfer: () => accounts, // TODO: handle transfers
  }

  return eventDispatchers[req.body.type](accounts, req, res)
}

export default eventHandler
