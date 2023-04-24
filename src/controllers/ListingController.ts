import { ContextRequest, Param, Path, PreProcessor, PUT } from 'typescript-rest'
import Request = Express.Request;
import { ListingService } from '../services/ListingService'
import { ListingCrud } from '../type/ListingCrud'
import { BadRequestError } from 'typescript-rest/dist/server/model/errors'
import { Decoded } from '../type/Decoded'
import { ListingResponse } from '../type/ListingResponse'

function validatorUser(request: Request): Request {
  const { decoded } = request
  if(!decoded?.user) {
    throw new BadRequestError('User Not Found')
  }
  decoded.user.subsidiaryId = +decoded.user.subsidiaryId
  return request
}

@Path('/listing')
export class ListingController {
  @PUT
  @PreProcessor(validatorUser)
  public update(
    @Param('listingId') listingId: number, @ContextRequest request: Request, listingCrud: ListingCrud
  ): Promise<ListingResponse> {

    const listingService = new ListingService()

    // decoded is defined and validate
    return listingService.update(request.decoded as Decoded, listingId, listingCrud)
  }
}