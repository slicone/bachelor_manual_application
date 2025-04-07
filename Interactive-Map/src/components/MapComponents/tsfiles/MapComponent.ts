import { ref, onMounted, reactive, defineComponent, computed } from 'vue'
import L from 'leaflet'
import { DataService } from '../../Services/DataService'
import { EventValidator } from '../../Services/EventValidator'
import { useEventData } from '../../stores/eventStore'
const eventDataStore = useEventData()

import { useMarkerStore } from '../../stores/markerStore'
const markerStore = useMarkerStore()

import ModalDetail from './ModalDetail.vue'
import ModalCreate from './ModalCreate.vue'
import { Modal } from 'bootstrap'

import type { Event } from '../../types'

const eventsRef = ref<Event[]>([])
const localXRef = ref<number>(0)
const localYRef = ref<number>(0)

// Dependencies
const dataHandler = new DataService(new EventValidator())

async function mapSetup() {
  const map = L.map('map').setView([51.505, -0.09], 13)

  // Add OpenStreetMap tiles to the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map)

  markerStore.setMap(map)

  await fetchAllEvents()
}

async function fetchAllEvents(): Promise<void> {
  const events = await dataHandler.fetchAllEvents()
  eventDataStore.setAllEventsUnfiltered(events)
  // because markers are shown dependend on filter list
  eventDataStore.setAllEventFiltered(events)
}

function addEventDoubleClick(): void {
  markerStore.mapRef.on('dblclick', function (e) {
    localXRef.value = e.latlng.lat
    localYRef.value = e.latlng.lng
    const modal = new Modal(document.getElementById('createModal'), {
      keyboard: true,
    })

    modal.show()
  })
}

onMounted(async () => {
  await mapSetup()
  markerStore.addMarkerOnStartUp()
  fetchAllEvents()
  addEventDoubleClick()
})