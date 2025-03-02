import { defineStore } from 'pinia'
import L from 'leaflet'
import { ref } from 'vue'
import type { Event } from '../types'
import { useEventData } from '../stores/eventStore'

export const useMarkerStore = defineStore('markerStore', () => {
  const eventDataStore = useEventData()

  const mapRef = ref<L.Map | null>(null)

  const setMap = async (map: L.Map) => {
    mapRef.value = map
  }

  const markerGroup = ref<L.LayerGroup | null>(null)

  const setMarkerGroup = async (layerG: L.LayerGroup) => {
    markerGroup.value = layerG
  }

  const addMarkerOnStartUp = () => {
    if (markerGroup.value !== null) {
      markerGroup.value.clearLayers()
    }

    if (mapRef.value !== null) {
      setMarkerGroup(L.layerGroup())
      eventDataStore.allEventFiltered.forEach((event) => {
        addMarkerToMap(event)
      });

      // LayerGroup cannot be null because it was set above
      (markerGroup.value as L.LayerGroup).addTo(mapRef.value as L.Map)
    }
  }

  const addMarkerToMap = (event: Event) => {
    if (markerGroup !== null) {
      var marker = L.marker([event.locationX, event.locationY])
        .addTo(markerGroup.value as L.LayerGroup)
        .bindPopup(
          `<div class='event-popup'>
            <b>${event.name}</b>
            <img src=http://localhost:3000/images/${event.image_name}></img>
            <b>${event.description_short}</b>
            <button id="event-button" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailModal">
              Erfahre mehr über das Event
            </button>
          </div>`,
        )
      marker.on('popupopen', () => {
        eventDataStore.setCurrentEvent(event)
        eventDataStore.setImageNames(event.id)
      })
    }
  }

  return {
    setMarkerGroup,
    markerGroup,
    setMap,
    mapRef,
    addMarkerOnStartUp,
    addMarkerToMap,
  }
})
