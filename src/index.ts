import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { Account, Event } from './types'
import { CustomRequest } from './interfaces'

dotenv.config()

const PORT = process.env.PORT || 3000
const app: Express = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let accounts: Array<Account> = []

app.get('/', (_: Request, res: Response) => {
  res.send(accounts)
})

app.post('/reset', (_: Request, res: Response) => {
  accounts = []
  res.status(200)
  res.send(accounts)
})

app.post('/event', (req: CustomRequest<Event>, res: Response) => {
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
    return
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
})

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`))
