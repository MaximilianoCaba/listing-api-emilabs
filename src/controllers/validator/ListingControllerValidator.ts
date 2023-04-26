import { ListingRequest } from '../../type/Listing'
import * as Joi from 'joi'
import { BadRequestError } from 'typescript-rest/dist/server/model/errors'

export function listingRequestValidator(listingRequest: ListingRequest): void {
  const validationListingRequest = Joi.object({
    companyName: Joi.string(),
    companyLogo: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    info: Joi.string(),
    state: Joi.string(),
    gs: Joi.string(),
    criteria: Joi.string(),
    steps: Joi.array()
  }).unknown(false)

  const validationResult = validationListingRequest.validate(listingRequest)
  if (validationResult.error) {
    throw new BadRequestError('Invalid body')
  }
}