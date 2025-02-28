<template>
  <div id="imageCarousel" class="carousel slide image-fit" data-bs-ride="carousel" v-if="eventDataStore.imageNames.length !== 0">
    <div class="carousel-indicators">
     <button
          v-for="(image, index) in eventDataStore.imageNames"
          :key="index"
          type="button"
          :data-bs-target="'#carouselExampleIndicators'"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
          :aria-current="index === 0 ? 'true' : 'false'"
          :aria-label="'Slide ' + (index + 1)"
        ></button>
    </div>

    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(image, index) in eventDataStore.imageNames" :key="index" :class="['carousel-item', index === 0 ? 'active' : '']">
          <img :src=buildUrl(image) class="d-block w-100">
        </div>
      </div>
    </div>

    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#imageCarousel"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#imageCarousel"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style scoped>
.image-fit {
  border: 5px solid #383e45;
  border-radius: 1.5%;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import type { Event } from '../types'
import { useEventData } from '../stores/eventStore'
const eventDataStore = useEventData();

import { DataService } from '../Services/DataService'
import { EventValidator } from '../Services/EventValidator'

const dataHandler = new DataService(new EventValidator())


function buildUrl(image): string {
    return `http://localhost:3000/images/${image.file_path}`;
}


</script>
