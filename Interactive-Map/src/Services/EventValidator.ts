import type { Event } from '../types'

export class EventValidator {
  private isEventValid(event: Event): boolean {
    return Object.values(event).every(
      (value) => value !== null && value !== undefined && value !== '',
    )
  }

  public isValid(event: Event): boolean {
    if (!this.isEventValid(event)) {
      // TODO Logging
      return false
    }

    if (event.description.length > 20) {
      // TODO Logging
      return false
    }

    try {
      new Date(event.start_date).toISOString()
      new Date(event.end_date).toISOString()
    } catch (error) {
      // TODO Logging
      return false
    }

    return true
  }
}
