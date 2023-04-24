import { StepCrud } from './StepCrud'

export interface ListingCrud {
  companyName?: string
  companyLogo?: string
  name?: string
  description?: string
  info?: string
  state?: string
  gs?: string
  criteria?: string
  steps: StepCrud[]
}