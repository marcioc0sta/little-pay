export type Event = {
  type: 'deposit' | 'withdraw' | 'transfer'
  destination: string
  amount: number
  origin?: string
}
