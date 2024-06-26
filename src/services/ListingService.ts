import { UserAuth } from '../type/UserAuth'
import { BadRequestError, NotFoundError } from 'typescript-rest/dist/server/model/errors'
import { ListingRequest, ListingResponse } from '../type/Listing'
import { StepService } from './StepService'
import { sequelize } from '../db'
import { ListingRepository } from '../repository/ListingRepository'

export class ListingService {
  public async update(decoded: UserAuth, listingId: number, listingCrud: ListingRequest): Promise<ListingResponse> {
    const transaction = await sequelize.transaction()
    try {

      const listingRepository = new ListingRepository(transaction)
      const listing = await listingRepository.findById(listingId)

      if (!listing) {
        throw new NotFoundError('Listing Not Found')
      }

      if(decoded.user.subsidiaryId !== listing.subsidiaryId) {
        throw new NotFoundError('Listing Not Found')
      }

      await listingRepository.update(listing, listingCrud)

      const stepService = new StepService()

      await stepService.updateStepsByListingId(listingId, listingCrud.steps || [], transaction)

      await transaction.commit()

      const listingResponseList: ListingResponse[] = await listingRepository.findByIdIncludedSubsidiaryAndCountryAndCompany(listingId)

      return listingResponseList[0]
    } catch (error) {
      await transaction.rollback()
      if(error instanceof NotFoundError) {
        throw error
      }
      throw new BadRequestError(error.message)
    }
  }
}