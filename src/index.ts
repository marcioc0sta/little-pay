import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import helmet from 'helmet'

import getBalance from './domains/balance'
import { createOrUpdate } from './domains/event'
import { Event } from './domains/event/types/Event.type'
import { CustomRequest } from './interfaces'
import { Account } from './types'

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

app.get('/balance', (req: Request, res: Response) => {
  getBalance(accounts, req, res)
})

app.post('/event', (req: CustomRequest<Event>, res: Response) => {
  const { destination: id, amount: balance } = req.body

  accounts = createOrUpdate(accounts, req.body)

  res.status(201)
  res.send({ destination: { id, balance } })
})

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`))
