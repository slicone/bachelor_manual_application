export interface Event {
  id: number
  user_id: number
  name: string
  description: string
  description_short: string
  locationX: number
  locationY: number
  city: string
  street: string
  zip: number
  fees: number
  start_date: string
  end_date: string
  image_name: string
}

export interface AddEvent {
  user_id: number
  name: string
  description: string
  description_short: string
  locationX: number
  locationY: number
  city: string
  street: string
  zip: number
  fees: number
  start_date: string
  end_date: string
  image_name: string
}

