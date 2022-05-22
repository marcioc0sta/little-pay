import { Response } from 'express'

import { CustomRequest } from '../../../interfaces'
import { Account } from '../../../types'
import { Event } from '../types/Event.type'

function transfers(
  accounts: Array<Account>,
  req: CustomRequest<Event>,
  res: Response
) {
  const { origin, amount, destination } = req.body
  const orgnAccIdx = accounts.findIndex(acc => acc.id === origin)
  const dstAccIdx = accounts.findIndex(acc => acc.id === destination)
  const orgnNotFound = orgnAccIdx === -1
  const dstNotFound = dstAccIdx === -1
  const orgnInsuficientBalance = accounts[orgnAccIdx].balance - amount < 0

  if (orgnNotFound) {
    res.status(404)
    res.send('0')
    return accounts
  }

  if (orgnInsuficientBalance) {
    res.status(403)
    res.send({
      illegalOperation: {
        message:
          'a conta de origem não tem saldo suficiente para esta operação',
      },
    })

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

    res.status(201)
    res.send({
      origin: { id: origin, balance: orgnUpdatedBalance },
      destination: { id: destination, balance: amount },
    })
    return accounts
  }

  operateAccBalance(orgnAccIdx, orgnUpdatedBalance)
  operateAccBalance(dstAccIdx, accounts[dstAccIdx].balance + amount)

  res.status(201)
  res.send({
    origin: { id: origin, balance: accounts[orgnAccIdx].balance - amount },
    destination: {
      id: destination,
      balance: accounts[dstAccIdx].balance + amount,
    },
  })

  return accounts
}

export default transfers
