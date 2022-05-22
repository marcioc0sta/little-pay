import { Response } from 'express'

import { CustomRequest } from '../../../interfaces'
import { Account } from '../../../types'
import { Event } from '../types/Event.type'

function createOrUpdate(
  accounts: Array<Account>,
  req: CustomRequest<Event>,
  res: Response
) {
  const { destination, amount } = req.body
  const destinationAccIdx = accounts.findIndex(acc => acc.id === destination)

  // updated ecc
  if (destinationAccIdx !== -1) {
    accounts[destinationAccIdx] = {
      id: destination,
      balance: accounts[destinationAccIdx].balance + amount,
    }

    res.status(201)
    res.send({ destination: { id: destination, balance: amount } })

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

  res.status(201)
  res.send({ destination: { id: destination, balance: amount } })

  return accounts
}

export default createOrUpdate
