import { defineStore } from 'pinia';
import { ref } from 'vue';
import { DataService } from '../Services/DataService'
import { EventValidator } from '../Services/EventValidator'
import type { Event } from '../types'

const dataHandler = new DataService(new EventValidator())

export const useEventData = defineStore('eventStore', () => {
  
  const imageNames = ref<string[]>([])

  const setImageNames = async (eventId: number) => {
    let { fileNames } = await dataHandler.getImageNamesForEvent(eventId)
    imageNames.value = fileNames;
  }

  const currentEvent = ref<Event | null>(null)

  const setCurrentEvent = async (event: Event) => {
    currentEvent.value = event
  }

  return { imageNames, setImageNames, currentEvent, setCurrentEvent };
});
