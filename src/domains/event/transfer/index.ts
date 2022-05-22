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
  const originAccIdx = accounts.findIndex(acc => acc.id === origin)
  const destinationAccIdx = accounts.findIndex(acc => acc.id === destination)
  const orgnNotFound = originAccIdx === -1
  const dstNotFound = destinationAccIdx === -1

  if (orgnNotFound) {
    res.status(404)
    res.send('0')
    return accounts
  }

  if (accounts[originAccIdx].balance - amount < 0) {
    res.status(403)
    res.send({
      illegalOperation: {
        message:
          'a conta de origem não tem saldo suficiente para esta operação',
      },
    })

    return accounts
  }

  const orgnUpdatedBalance = accounts[originAccIdx].balance - amount

  const decreaseOrgn = () => {
    accounts[originAccIdx] = {
      ...accounts[originAccIdx],
      balance: orgnUpdatedBalance,
    }
  }

  if (dstNotFound) {
    decreaseOrgn()

    accounts = [
      ...accounts,
      {
        id: destination,
        balance: amount,
      },
    ]

    res.status(201)
    res.send({
      origin: { id: origin, balance: orgnUpdatedBalance },
      destination: { id: destination, balance: amount },
    })
    return accounts
  }

  decreaseOrgn()

  accounts[destinationAccIdx] = {
    ...accounts[destinationAccIdx],
    balance: accounts[destinationAccIdx].balance + amount,
  }

  res.status(201)
  res.send({
    origin: { id: origin, balance: accounts[originAccIdx].balance - amount },
    destination: {
      id: destination,
      balance: accounts[destinationAccIdx].balance + amount,
    },
  })

  return accounts
}

export default transfers
