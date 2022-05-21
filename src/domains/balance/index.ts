import { Account } from '../../types'
import { Request, Response } from 'express'
import { Balance } from './types/Balance.type'

function getBalance(accounts: Array<Account>, req: Request, res: Response) {
  const { account_id } = req.query as Balance
  const accountFound = accounts.find(acc => acc.id === account_id)

  if (!accountFound) {
    res.status(404)
    res.send('0')
    return
  }

  res.status(200)
  res.send(`${accountFound.balance}`)
}

export default getBalance
