import Vue, { ref } from 'vue'
import { EventFilter } from '../../Services/EventFilter'
import { useEventData } from '../../stores/eventStore'
import { useMarkerStore } from '../../stores/markerStore'

const markerStore = useMarkerStore()
const eventDataStore = useEventData()

const eventName = ref<string>('')
const startDate = ref<string>('')
const endDate = ref<string>('')
const xStart = ref<number | string | null>(null)
const xEnd = ref<number | string | null>(null)
const yStart = ref<number | string | null>(null)
const yEnd = ref<number | string | null>(null)
const noPrice = ref<boolean>(false)

function setMarkerAfterFilter() {
  markerStore.markerGroup.clearLayers()
  markerStore.addMarkerOnStartUp()
}

function setEventFilterList(eventFilter: EventFilter) {
  const filteredList = eventFilter.getFilteredEventList()
  eventDataStore.setAllEventFiltered(filteredList)
}

function handleSubmit() {
  const eventFilter = new EventFilter(eventDataStore.allEventsUnfiltered)
  eventFilter.setNameFilter(eventName.value)
  eventFilter.setDateBeginnFilter(startDate.value)
  eventFilter.setDateEndFilter(endDate.value)
  eventFilter.setLocationXSpanFilter(xStart.value, xEnd.value)
  eventFilter.setLocationYSpanFilter(yStart.value, yEnd.value)
  eventFilter.setEventIsFreeFilter(noPrice.value)

  setEventFilterList(eventFilter)

  setMarkerAfterFilter()
}