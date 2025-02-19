<template>
    <div id="map"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import L from 'leaflet'

function addMarker(map) {
   var marker = L.marker([51.505, -0.09]) 
    .addTo(map)
    .bindPopup("<div class='test'><img src='../../../public/snake.jpg'></img><b>Hello!</b></div>")
    .openPopup();

     marker.bindTooltip("my tooltip text").openTooltip();
}

function mapSetup(): L.Map{
  // Initialize the map in the container with a specific view
  const map = L.map("map").setView([51.505, -0.09], 13);
  
  // Add OpenStreetMap tiles to the map
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  return map;
}

function fetchAllEvents() {
  // TODO 
}

onMounted(() => {
  var map = mapSetup();

  addMarker(map);

 

});
</script>

<style>
#map {
  width: 1400px;
  height: 800px;
}

.test {
  color: blue;
  display: flex; 
  flex-direction: column; 
  align-items: center;
  gap: 10px;
}
</style>
