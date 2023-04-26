export interface StepRequest {
  id?: number
  flowId: number
  name: string
  step: unknown
}

export interface StepBulk {
  flowId?: number
  name: string
  step: unknown
  listingFlow: unknown
}