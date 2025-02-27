export interface InsertEventResponse {
  success: boolean
  eventId: number | null
}

export interface UploadFilesResponse {
  success: boolean
  filesName: string[]
}
