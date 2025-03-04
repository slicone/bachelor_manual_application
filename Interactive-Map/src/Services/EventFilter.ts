import type { Event } from '../types'

export class EventFilter {
  private eventList: Event[]

  constructor(eventList: Event[]) {
    this.eventList = eventList
  }

  public setNameFilter(name: string): void {
    if (this.eventList.length === 0 || name === '') {
      return
    }
    this.eventList = this.eventList.filter((event) => event.name.includes(name))
  }

  public setDateBeginnFilter(dateBegin: string): void {
    if (this.eventList.length === 0 || dateBegin === '') {
      return
    }
    this.eventList = this.eventList.filter((event) => new Date(event.start_date) >= new Date(dateBegin));

  }

  public setDateEndFilter(dateEnd: string): void {
    if (this.eventList.length === 0 || dateEnd === '') {
      return
    }
    this.eventList = this.eventList.filter((event) => new Date(event.end_date) <= new Date(dateEnd));
  }

  public setLocationXSpanFilter(startX: number | null | string, endX: number | null | string): void {
    if (this.eventList.length === 0 || startX === null || endX === null || typeof startX === 'string' || typeof endX === 'string') {
      return
    }
    this.eventList = this.eventList.filter((event) => Math.abs(event.locationX) >= Math.abs(startX) && Math.abs(event.locationX) <= Math.abs(endX));
  }

  public setLocationYSpanFilter(startY: number | null | string, endY: number | null | string): void {
    if (this.eventList.length === 0 || startY === null || endY === null || typeof startY === 'string' || typeof endY === 'string') {
      return
    }
    this.eventList = this.eventList.filter((event) => Math.abs(event.locationY) >= Math.abs(startY) && Math.abs(event.locationY) <= Math.abs(endY));
  }

  public setEventIsFreeFilter(isFree: boolean): void {
    if (this.eventList.length === 0 || !isFree) {
      return
    }
    this.eventList = this.eventList.filter((event) => event.fees === 0.0);
  }

  public getFilteredEventList(): Event[] {
    return this.eventList
  }
}
