import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DataService } from '../Services/DataService'
import { EventValidator } from '../Services/EventValidator'
import type { Event } from '../types'

const dataHandler = new DataService(new EventValidator())

export const useEventData = defineStore('eventStore', () => {
  const imageNames = ref<string[]>([])

  const setImageNames = async (eventId: number | null) => {
    const { fileNames } = await dataHandler.getImageNamesForEvent(eventId)
    imageNames.value = fileNames
  }

  const currentEvent = ref<Event | null>(null)

  const setCurrentEvent = async (event: Event) => {
    currentEvent.value = event
  }

  // Original Events needed for filter
  const allEventsUnfiltered = ref<Event[]>([])

  const setAllEventsUnfiltered = async (events: Event[]) => {
    allEventsUnfiltered.value = events
  }

  const allEventFiltered = ref<Event[]>([])

  const setAllEventFiltered = async (events: Event[]) => {
    allEventFiltered.value = events
  }

  return {
    imageNames,
    setImageNames,
    currentEvent,
    setCurrentEvent,
    setAllEventFiltered,
    allEventFiltered,
    setAllEventsUnfiltered,
    allEventsUnfiltered,
  }
})
