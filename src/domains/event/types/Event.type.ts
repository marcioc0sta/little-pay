export type Event = {
  type: 'deposit' | 'withdraw' | 'transfer'
  destination?: string | any
  amount: number
  origin: string
}
