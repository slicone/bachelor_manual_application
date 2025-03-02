<template>
  <div class="map-sidebar">
    <div id="map"></div>
    <ModalDetail v-if="eventDataStore.currentEvent !== null" />
    <ModalCreate
      :localXRef="localXRef"
      :localYRef="localYRef"
    ></ModalCreate>
  </div>
</template>

<script setup lang="ts">
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
  let map = L.map('map').setView([51.505, -0.09], 13)

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
    var modal = new Modal(document.getElementById('createModal'), {
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
</script>

<style>
#map {
  position: absolute;
  top: 5%;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 95%;
  z-index: 10;
}

.btn-add-marker {
  position: absolute;
  top: 80%;
  left: 10%;
  z-index: 20;
}

.event-popup {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.event-popup img {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border: 5px solid #383e45;
  border-radius: 5%;
}

.map-sidebar {
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
  background-color: #2b3035;
}
</style>
