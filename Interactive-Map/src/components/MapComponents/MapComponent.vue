<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reactive } from 'vue'
import L from 'leaflet'
import { DataHandler } from '../../Services/DataHandler'

import type { Event } from '../../types'

const events = ref<Event[]>([])

// Dependencies
const dataHandler = new DataHandler();

function resizePicture(file_path: string): boolean {
  return false
}

function addMarker(map: L.Map): void {
  // TODO format pictures!

  events.value.forEach((event) => {
    var marker = L.marker([event.locationX, event.locationY])
      .addTo(map)
      .bindPopup(
        `<div class='event-popup'>
                    <img src=${event.file_path_main}></img>
                    <b>${event.description_short}</b>
                  </div>`,
      )
      .openPopup()

    marker.bindTooltip('my tooltip text').openTooltip()
  })
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

  map.on('click', function (e) {
    var lat = e.latlng.lat
    var lng = e.latlng.lng

    // Create a new marker at the clicked location
    var marker = L.marker([lat, lng]).addTo(map)

    // Optionally, you can bind a popup to the marker
    marker.bindPopup('You clicked here!').openPopup()
  })
})
</script>

<style>
#map {
  width: 1400px;
  height: 800px;
}

.event-popup {
  color: blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
