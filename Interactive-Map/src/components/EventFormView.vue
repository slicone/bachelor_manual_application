<template>
  <div>
    <ImageCarousel class="scale-image" />
    <form @submit.prevent="handleSubmit">
      <div style="gap: 10px 20px">
        <div class="row g-2 row-gap">
          <div class="form-floating col">
            <input
              v-model="eventDataStore.currentEvent.name"
              class="form-control"
              id="floatingInputName"
              readonly
            />
            <label for="floatingInputName" class="input-label">Event Name</label>
          </div>
          <div class="form-floating col">
            <input
              v-model="eventDataStore.currentEvent.city"
              class="form-control"
              id="floatingInputCity"
              readonly
            />
            <label for="floatingInputCity" class="input-label">Stadt</label>
          </div>
        </div>

        <div class="row g-2 row-gap">
          <div class="form-floating col">
            <input
              v-model="eventDataStore.currentEvent.street"
              class="form-control"
              id="floatingInputStreet"
              readonly
            />
            <label for="floatingInputStreet" class="input-label">Straße</label>
          </div>
          <div class="form-floating col">
            <input
              v-model="eventDataStore.currentEvent.zip"
              type="number"
              class="form-control"
              id="floatingInputZip"
              readonly
            />
            <label for="floatingInputZip" class="input-label">PLZ</label>
          </div>
        </div>

        <div class="row g-2 row-gap">
          <div class="form-floating col">
            <input
              v-model="eventDataStore.currentEvent.start_date"
              type="datetime-local"
              class="form-control"
              id="floatingInputStart"
              readonly
            />
            <label for="floatingInputStart" class="input-label">Beginn</label>
          </div>
          <div class="form-floating col">
            <input
              v-model="eventDataStore.currentEvent.end_date"
              type="datetime-local"
              class="form-control"
              id="floatingInputEnd"
              readonly
            />
            <label for="floatingInputEnd" class="input-label">Ende</label>
          </div>
        </div>

        <div class="row g-2 row-gap">
          <div class="form-floating col">
            <input
              v-model="eventDataStore.currentEvent.fees"
              type="number"
              class="form-control"
              id="floatingInputFees"
              readonly
            />
            <label for="floatingInputFees" class="input-label">Gebühren</label>
          </div>
          <div class="form-floating col">
            <input
              v-model="eventDataStore.currentEvent.description_short"
              class="form-control"
              id="floatingInputShortDesc"
              readonly
            />
            <label for="floatingInputShortDesc" class="input-label">Verkürzte Beschreibung</label>
          </div>
        </div>

        <div class="form-floating row-gap">
          <textarea
            v-model="eventDataStore.currentEvent.description"
            class="form-control"
            id="floatingTextarea"
            style="height: 150px"
            readonly
          ></textarea>
          <label for="floatingTextarea">Beschreibung des Events</label>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.input-label {
  padding-left: 15px;
}

.row-gap {
  padding-bottom: 10px;
}
</style>

<script setup lang="ts">
import type { Event } from '../types'
import ImageCarousel from './ImageCarousel.vue'
import { useEventData } from '../stores/eventStore'
const eventDataStore = useEventData()
</script>

<style scoped>
.scale-image {
  display: flex;
  flex-direction: column;
  height: 250px;
  width: auto;
  overflow: hidden;
  margin-bottom: 10px;
}
</style>
