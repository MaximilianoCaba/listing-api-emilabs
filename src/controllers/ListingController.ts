import { ContextRequest, Param, Path, PUT } from 'typescript-rest'
import { Request as JWTRequest } from 'express-jwt'
import { ListingService } from '../services/ListingService'
import { ListingRequest, ListingResponse } from '../type/Listing'
import { Decoded } from '../type/Decoded'

@Path('/listings')
export class ListingController {
  @PUT
  public update(
    @Param('listingId') listingId: number, @ContextRequest request: JWTRequest, listingCrud: ListingRequest
  ): Promise<ListingResponse> {
    const listingService = new ListingService()

    // decoded is defined and validate
    return listingService.update(request.auth as Decoded, listingId, listingCrud)
  }
}