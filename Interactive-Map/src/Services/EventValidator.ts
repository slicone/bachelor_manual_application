import type { AddEvent } from '../types'

export class EventValidator {
  private isEventValid(event: AddEvent): boolean {
    return Object.values(event).every(
      (value) => value !== null && value !== undefined && value !== '',
    )
  }

  public isValid(event: AddEvent): boolean {
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
