import type {
  Event,
  InsertEventResponse,
  UploadFilesResponse,
  ImageNamesResponse,
  AddEvent,
} from '../types'
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

  async addEvent(event: AddEvent): Promise<InsertEventResponse> {
    if (!this.eventValidator.isValid(event)) {
      return { success: false, eventId: null }
    }

    try {
      const response = await fetch('http://localhost:3000/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })
      let responseBody = await response.json()
      return { success: response.ok, eventId: responseBody.eventId }
    } catch (error) {
      console.error(error)
      return { success: false, eventId: null }
    }
  }

  async uploadFiles(file: File[], eventId: number | null = null): Promise<UploadFilesResponse> {
    if (file.length === 0) {
      return { success: false, filesName: [''] }
    }

    const formData = new FormData()
    file.forEach((file) => formData.append('images', file))

    if (eventId !== null) {
      formData.append('eventId', eventId.toString())
    }

    try {
      const response = await fetch('http://localhost:3000/image/upload', {
        method: 'POST',
        body: formData,
      })
      let responseBody = await response.json()
      return { success: response.ok, filesName: responseBody.files }
    } catch (error) {
      console.error(error)
      return { success: false, filesName: [''] }
    }
  }

  async getImageNamesForEvent(eventId: number | null): Promise<ImageNamesResponse> {
    try {
      const response = await fetch(`http://localhost:3000/image/upload?eventId=${eventId}`)
      let responseBody = await response.json()
      return { success: response.ok, fileNames: responseBody.fileNames }
    } catch (error) {
      console.error(error)
      return { success: false, fileNames: [''] }
    }
  }
}
