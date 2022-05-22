import { Response } from 'express'

import { CustomRequest } from '../../../interfaces'
import { Account } from '../../../types'
import { Event } from '../types/Event.type'

function withdrawals(
  accounts: Array<Account>,
  req: CustomRequest<Event>,
  res: Response
) {
  const { origin, amount } = req.body
  const originAccIdx = accounts.findIndex(acc => acc.id === origin)
  const accNotFound = originAccIdx === -1

  if (accNotFound) {
    res.status(404)
    res.send('0')
    return accounts
  }

  const accBalance = accounts[originAccIdx].balance
  const updatedBalance = accBalance - amount

  accounts[originAccIdx] = {
    ...accounts[originAccIdx],
    balance: updatedBalance,
  }

  res.status(201)
  res.send({ origin: { id: origin, balance: updatedBalance } })

  return accounts
}

export default withdrawals
