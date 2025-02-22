<template>
  <div class="map-sidebar">
    <div id="map"></div>
    <Modal />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, defineComponent } from 'vue'
import L from 'leaflet'
import { DataService } from '../../Services/DataService'
import Modal from './Modal.vue'

import type { Event } from '../../types'

const events = ref<Event[]>([]);

const currentEvent = ref<Event | null>(null);

const dialogRef = ref(null)

const openDialog = () => dialogRef.value?.showModal()
const closeDialog = () => dialogRef.value?.close()

// Dependencies
const dataHandler = new DataService()

function resizePicture(file_path: string): boolean {
  return false
}

function addMarker(map: L.Map): void {
  events.value.forEach((event) => {
    var marker = L.marker([event.locationX, event.locationY])
      .addTo(map)
      .bindPopup(
        `<div class='event-popup'>
                    <img src=http://localhost:3000/images/${event.image_name}></img>
                    <b>${event.description_short}</b>
                    <button id="event-button" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Erfahre mehr über das Event
                    </button>
                  </div>`,
      )

    marker.on('popupopen', () => {
      setCurrentEvent(event)
  });

    //marker.bindTooltip('my tooltip text').openTooltip()
  })
}

function setCurrentEvent(event: Event): void {
  currentEvent.value = event
  console.log("halo")
}

async function mapSetup(): Promise<L.Map> {
  // Initialize the map in the container with a specific view
  const map = L.map('map').setView([51.505, -0.09], 13)

  // Add OpenStreetMap tiles to the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map)

  await fetchAllEvents()

  console.log(events.value)

  return map
}

async function fetchAllEvents(): Promise<void> {
  events.value = await dataHandler.fetchAllEvents()
}

onMounted(async () => {
  var map = await mapSetup()

  addMarker(map)

  fetchAllEvents()

  /*
  map.on('click', function (e) {
    var lat = e.latlng.lat
    var lng = e.latlng.lng

    // Create a new marker at the clicked location
    var marker = L.marker([lat, lng]).addTo(map)

    // Optionally, you can bind a popup to the marker
    marker.bindPopup('You clicked here!').openPopup()
  })
  */
})
</script>

<style>
#map {
  width: 1200px;
  height: 800px;
}

.event-popup {
  color: blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.map-sidebar {
  display: flex;
  flex-direction: row;
}
</style>
