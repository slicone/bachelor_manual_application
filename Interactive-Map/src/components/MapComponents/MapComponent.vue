<template>
  <div class="map-sidebar">
    <div id="map"></div>
    <ModalDetail v-if="currentEventRef !== null" :currentEvent="currentEventRef" />
    <ModalCreate :localXRef=localXRef :localYRef=localYRef></ModalCreate>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, defineComponent } from 'vue'
import L from 'leaflet'
import { DataService } from '../../Services/DataService'
import { EventValidator } from '../../Services/EventValidator'

import ModalDetail from './ModalDetail.vue'
import ModalCreate from './ModalCreate.vue'
import { Modal } from 'bootstrap'

import type { Event } from '../../types'

const eventsRef = ref<Event[]>([])
const currentEventRef = ref<Event | null>(null)
const localXRef = ref<number>(0);
const localYRef = ref<number>(0);

let map: L.Map

// Dependencies
const dataHandler = new DataService(new EventValidator())

function addMarkerOnStartUp(): void {
  eventsRef.value.forEach((event) => {
    addMarkerToMap(event)
  })
}

function addMarkerToMap(event: Event): void {
  var marker = L.marker([event.locationX, event.locationY])
    .addTo(map)
    .bindPopup(
      `<div class='event-popup'>
          <b>${event.description_short}</b>
          <img src=http://localhost:3000/images/${event.image_name}></img>
          <button id="event-button" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailModal">
            Erfahre mehr über das Event
          </button>
        </div>`,
    )
  marker.on('popupopen', () => {
    setCurrentEvent(event)
  })
}

function setCurrentEvent(event: Event): void {
  currentEventRef.value = event
}

async function mapSetup(): Promise<L.Map> {
  // Initialize the map in the container with a specific view
  map = L.map('map').setView([51.505, -0.09], 13)

  // Add OpenStreetMap tiles to the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map)

  await fetchAllEvents()

  return map
}

async function fetchAllEvents(): Promise<void> {
  eventsRef.value = await dataHandler.fetchAllEvents()
}

function addEventDoubleClick(): void {
  map.on('dblclick', function (e) {
    localXRef.value = e.latlng.lat
    localYRef.value = e.latlng.lng
    var myModal = new Modal(document.getElementById('createModal'), {
      keyboard: true,
    })

    myModal.show()

    // TODO add marker if saved and added to database (successfull api call)
  })
}

onMounted(async () => {
  await mapSetup()
  addMarkerOnStartUp()
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
  background-color: b;
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
