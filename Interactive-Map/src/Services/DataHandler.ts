import type { Event } from '../types'

export class DataHandler {
  async fetchAllEvents(): Promise<Event[]> {
    const response = await fetch('http://localhost:3000/events')
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
  }
}
