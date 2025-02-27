import type { Event } from '../types'
import { EventValidator } from './EventValidator'

export class DataService {
  private eventValidator: EventValidator

  constructor(eventValidator: EventValidator) {
    this.eventValidator = eventValidator
  }

  async fetchAllEvents(): Promise<Event[]> {
    try {
      const response = await fetch('http://localhost:3000/events')
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async addEvent(event: Event): Promise<boolean> {
    if (!this.eventValidator.isValid(event)) {
      return false
    }

    try {
      const response = await fetch('http://localhost:3000/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })
      return response.ok
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async uploadFiles(file: File[]): Promise<[boolean, string[]]> {
    if (file.length === 0) {
      return [false, ['']]
    };

    const formData = new FormData()
    file.forEach((file) => formData.append("images", file));

    try {
      const response = await fetch('http://localhost:3000/image/upload', {
        method: 'POST',
        body: formData,
      })
      let responseBody = await response.json();
      return [response.ok, responseBody.files]
    } catch (error) {
      console.error(error)
      return [false, ['']]
    }
  }

}
