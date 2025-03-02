<template>
  <form @submit.prevent="handleSubmit">
    <div style="gap: 10px 20px">
      <div class="row g-2 row-gap">
        <div class="form-floating col">
          <input
            v-model="eventName"
            :maxlength="maxLengthTitle"
            class="form-control"
            id="floatingInputName"
            required
          />
          <label for="floatingInputName" class="input-label">Event Name</label>
        </div>
        <div class="form-floating col">
          <input v-model="city" class="form-control" id="floatingInputCity" required />
          <label for="floatingInputCity" class="input-label">Stadt</label>
        </div>
      </div>

      <div class="row g-2 row-gap">
        <div class="form-floating col">
          <input v-model="street" class="form-control" id="floatingInputStreet" required />
          <label for="floatingInputStreet" class="input-label">Straße</label>
        </div>
        <div class="form-floating col">
          <input v-model="zip" type="number" class="form-control" id="floatingInputZip" required />
          <label for="floatingInputZip" class="input-label">PLZ</label>
        </div>
      </div>

      <div class="row g-2 row-gap">
        <div class="form-floating col">
          <input
            v-model="startDate"
            type="datetime-local"
            class="form-control"
            id="floatingInputStart"
            required
          />
          <label for="floatingInputStart" class="input-label">Beginn</label>
        </div>
        <div class="form-floating col">
          <input
            v-model="endDate"
            type="datetime-local"
            class="form-control"
            id="floatingInputEnd"
            required
          />
          <label for="floatingInputEnd" class="input-label">Ende</label>
        </div>
      </div>

      <div class="row g-2 row-gap">
        <div class="form-floating col">
          <input
            v-model="fees"
            type="number"
            class="form-control"
            id="floatingInputFees"
            required
          />
          <label for="floatingInputFees" class="input-label">Gebühren</label>
        </div>
        <div class="form-floating col">
          <input
            :maxlength="maxLengthDesc"
            v-model="shortDesc"
            class="form-control"
            id="floatingInputShortDesc"
            required
          />
          <label for="floatingInputShortDesc" class="input-label">Verkürzte Beschreibung</label>
        </div>
      </div>

      <div class="form-floating row-gap">
        <textarea v-model="desc" class="form-control" id="floatingTextarea"></textarea>
        <label for="floatingTextarea">Beschreibung des Events</label>
      </div>

      <div class="mb-3 row-gap">
        <label for="formFile" class="form-label">Titelbild</label>
        <input class="form-control" type="file" id="formFile" @change="handleFileChange" required />
      </div>

      <div class="mb-3 row-gap">
        <label for="files" class="form-label">Beschreibungsbilder</label>
        <input type="file" class="form-control" id="files" @change="handleFilesChange" multiple />
      </div>

      <div class="modal-footer">
        <div v-if="!submitSuccessfull" style="color: red">Error Submitting Form</div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <button
          type="button"
          id="eventCreateClose"
          class="btn btn-secondary"
          @click="submitSuccessfull = true"
          data-bs-dismiss="modal"
        >
          Close
        </button>
      </div>
    </div>
  </form>
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
import { DataService } from '../Services/DataService'
import { EventValidator } from '../Services/EventValidator'
import type { Event as EventDTO, InsertEventResponse, UploadFilesResponse } from '../types'

import { Modal } from 'bootstrap'
import { Ref, ref } from 'vue'

import { useMarkerStore } from '../stores/markerStore'
const markerStore = useMarkerStore()

const maxLengthDesc = 20
const maxLengthTitle = 15

// refs
const eventName = ref<string>('')
const city = ref<string>('')
const street = ref<string>('')
const zip = ref<number>(0)
const startDate = ref<string>('')
const endDate = ref<string>('')
const fees = ref<number>(0)
const shortDesc = ref<string>('')
const desc = ref<string>('')
const mainFile = ref<File>(null)
const selectedFiles = ref<File[]>([])
const submitSuccessfull = ref<boolean>(true)

const dataHandler = new DataService(new EventValidator())

const props = defineProps<{
  localXRef: number
  localYRef: number
}>()

async function handleSubmit(): Promise<void> {
  let { filesName: fileName } = await uploadFile()

  let eventInfo: EventDTO = {
    user_id: 0,
    name: eventName.value,
    city: city.value,
    street: street.value,
    zip: zip.value,
    // remove milliseconds
    start_date: new Date(startDate.value).toISOString().split('.')[0],
    end_date: new Date(endDate.value).toISOString().split('.')[0],
    fees: fees.value,
    description_short: shortDesc.value,
    description: desc.value,
    image_name: fileName[0],
    locationX: props.localXRef,
    locationY: props.localYRef,
  }

  let { success: successEvent, eventId: eventId } = await dataHandler.addEvent(eventInfo)

  submitSuccessfull.value = successEvent

  await uploadFiles(eventId)

  if (submitSuccessfull.value) {
    markerStore.addMarkerToMap(eventInfo)
    const button = document.getElementById('eventCreateClose') as HTMLButtonElement
    button.click()
  }

  clearForm()
}

function clearForm(): void {
  eventName.value = ''
  city.value = ''
  street.value = ''
  zip.value = 0
  startDate.value = ''
  endDate.value = ''
  fees.value = 0
  shortDesc.value = ''
  desc.value = ''
  mainFile.value = null
  selectedFiles.value = []
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  console.log(target.files)
  if (target.files) {
    mainFile.value = target.files[0]
  }
}

function handleFilesChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    selectedFiles.value = Array.from(target.files)
  }
}

async function uploadFiles(entryId: number): Promise<UploadFilesResponse> {
  return await dataHandler.uploadFiles(selectedFiles.value, entryId)
}

async function uploadFile(): Promise<UploadFilesResponse> {
  return await dataHandler.uploadFiles([mainFile.value])
}
</script>
