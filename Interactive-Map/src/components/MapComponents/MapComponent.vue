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

async function fetchAllEvents() {
  // TODO 
  try {
    const response = await fetch("http://localhost:3000/");
    if (!response.ok) 
      throw new Error("Failed to fetch data");
    console.log("ja");
    let test = await response.json()
    console.log(test);
  } catch (e){

  }
}

onMounted(() => {
  var map = mapSetup();

  addMarker(map);

  fetchAllEvents();

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
