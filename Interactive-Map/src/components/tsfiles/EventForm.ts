import { DataService } from '../../Services/DataService'
import { EventValidator } from '../../Services/EventValidator'
import type { Event as EventDTO, InsertEventResponse, UploadFilesResponse } from '../../types'

import { Modal } from 'bootstrap'
import { Ref, ref } from 'vue'

import { useMarkerStore } from '../../stores/markerStore'
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
  const { filesName: fileName } = await uploadFile()

  const eventInfo: EventDTO = {
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

  const { success: successEvent, eventId: eventId } = await dataHandler.addEvent(eventInfo)

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