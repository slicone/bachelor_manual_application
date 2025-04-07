import { ref } from 'vue'
import type { Event } from '../../types'
import { useEventData } from '../../stores/eventStore'
const eventDataStore = useEventData()

import { DataService } from '../../Services/DataService'
import { EventValidator } from '../../Services/EventValidator'

const dataHandler = new DataService(new EventValidator())

function buildUrl(image): string {
  return `http://localhost:3000/images/${image.file_path}`
}