import { ContextRequest, Param, Path, PUT } from 'typescript-rest'
import { Request as JWTRequest } from 'express-jwt'
import { ListingService } from '../services/ListingService'
import { ListingRequest, ListingResponse } from '../type/Listing'
import { UserAuth } from '../type/UserAuth'
import { BadRequestError } from 'typescript-rest/dist/server/model/errors'
import { listingRequestValidator } from './validator/ListingControllerValidator'

@Path('/listings')
export class ListingController {
  @PUT
  public update(
    @Param('listingId') listingId: number, 
      @ContextRequest request: JWTRequest, 
      listingRequest: ListingRequest
  ): Promise<ListingResponse> {
    if (isNaN(listingId)) {
      throw new BadRequestError('listingId must be a number')
    }
    listingRequestValidator(listingRequest)
    const listingService = new ListingService()
    return listingService.update(request.auth as UserAuth, listingId, listingRequest)
  }
}