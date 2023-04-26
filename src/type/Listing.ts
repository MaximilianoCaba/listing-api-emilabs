import { StepRequest } from './Step'

export interface ListingRequest {
  companyName?: string
  companyLogo?: string
  name?: string
  description?: string
  info?: string
  state?: string
  gs?: string
  criteria?: string
  steps: StepRequest[]
}

export interface ListingResponse {
  subsidiaryId?: number
  countryName?: string
  countryCode?: string
  subsidiaryName?: string
  subsidiaryLogo?: string
  id?: number
  companyName?: string
  companyLogo?: string
  name?: string
  description?: string
  criteria?: string
  info?: string
  state?: string
  gs?: string
  platformListings?: number
}
