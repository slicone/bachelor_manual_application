<template>
  <nav class="navbar bg-body-tertiary fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="/favicon.ico" alt="Bootstrap" width="30" height="24" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Event Filter</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <form @submit.prevent="handleSubmit">
            <div class="nav-item form-floating row-gap">
              <input v-model="eventName" class="form-control" id="floatingInputValue" />
              <label for="floatingInputValue">Name des Events</label>
            </div>

            <div class="form-floating row-gap">
              <input
                v-model="startDate"
                type="datetime-local"
                class="form-control"
                id="floatingInputStart"
              />
              <label for="floatingInputStart" class="input-label">Beginn</label>
            </div>
            <div class="form-floating col row-gap">
              <input
                v-model="endDate"
                type="datetime-local"
                class="form-control"
                id="floatingInputEnd"
              />
              <label for="floatingInputEnd" class="input-label">Ende</label>
            </div>

            <div class="row row-gap">
              <b>Standort X Spanne</b>
              <div class="col">
                <div class="nav-item form-floating">
                  <input
                    type="number"
                    v-model="xStart"
                    class="form-control"
                    id="floatingInputValue"
                  />
                  <label for="floatingInputValue">Von X</label>
                </div>
              </div>
              <div class="col">
                <div class="nav-item form-floating">
                  <input
                    type="number"
                    v-model="xEnd"
                    class="form-control"
                    id="floatingInputValue"
                  />
                  <label for="floatingInputValue">Bis X</label>
                </div>
              </div>
            </div>

            <div class="row row-gap">
              <b>Standort Y Spanne</b>
              <div class="col">
                <div class="nav-item form-floating">
                  <input
                    type="number"
                    v-model="yStart"
                    class="form-control"
                    id="floatingInputValue"
                  />
                  <label for="floatingInputValue">Von Y</label>
                </div>
              </div>
              <div class="col">
                <div class="nav-item form-floating">
                  <input
                    type="number"
                    v-model="yEnd"
                    class="form-control"
                    id="floatingInputValue"
                  />
                  <label for="floatingInputValue">Bis Y</label>
                </div>
              </div>
            </div>

            <div class="form-check row-gap">
              <input
                v-model="noPrice"
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault"> Event ist kostenlos </label>
            </div>

            <div class="footer-button">
              <button type="submit" class="btn btn-outline-warning">Apply</button>
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="offcanvas">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Vue, { ref } from 'vue'
import { EventFilter } from '../Services/EventFilter'
import { useEventData } from '../stores/eventStore'
import { useMarkerStore } from '../stores/markerStore'

const markerStore = useMarkerStore()
const eventDataStore = useEventData()

const eventName = ref<string>('')
const startDate = ref<string>('')
const endDate = ref<string>('')
const xStart = ref<string>('')
const xEnd = ref<string>('')
const yStart = ref<string>('')
const yEnd = ref<string>('')
const noPrice = ref<boolean>(false)

function handleSubmit() {
  let eventFilter = new EventFilter(eventDataStore.allEventsUnfiltered)
  eventFilter.setNameFilter(eventName.value)
  let filteredList = eventFilter.getFilteredEventList()

  eventDataStore.setAllEventFiltered(filteredList)
  console.log(eventDataStore.allEventFiltered)

  markerStore.markerGroup.clearLayers()
  markerStore.addMarkerOnStartUp()
}
</script>

<style scoped>
.row-gap {
  margin-bottom: 10px;
  gap: 10px;
}

.footer-button {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
