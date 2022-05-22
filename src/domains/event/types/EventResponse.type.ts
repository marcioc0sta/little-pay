type EventResponse = {
  origin?: {
    id: string
    balance: number
  }
  destination?: {
    id: string
    balance: number
  }
}

export default EventResponse
