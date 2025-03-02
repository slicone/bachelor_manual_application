import type { Event } from '../types'

export class EventFilter {
  private eventList: Event[]

  constructor(eventList: Event[]) {
    this.eventList = eventList
  }

  public setNameFilter(name: string | null): void {
    if (this.eventList.length === 0 || name === null) {
      return
    }
    this.eventList = this.eventList.filter((event) => event.name.includes(name))
  }

  public setDateBeginnFilter(dateBegin: string | null): void {
    if (this.eventList.length === 0 || dateBegin === null) {
      return
    }
  }

  public setDateEndFilter(dateEnd: string | null): void {
    if (this.eventList.length === 0 || dateEnd === null) {
      return
    }
  }

  public setLocationXSpanFilter(startX: number | null, endX: number | null): void {
    if (this.eventList.length === 0 || startX === null || endX === null) {
      return
    }
  }

  public setLocationYSpanFilter(startY: number | null, endY: number | null): void {
    if (this.eventList.length === 0 || startY === null || endY === null) {
      return
    }
  }

  public setEventIsFreeFilter(isFree: boolean): void {
    if (this.eventList.length === 0) {
      return
    }
  }

  public getFilteredEventList(): Event[] {
    return this.eventList
  }
}
