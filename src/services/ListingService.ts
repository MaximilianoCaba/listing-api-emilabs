import { Decoded } from '../type/Decoded'
import { BadRequestError, NotFoundError } from 'typescript-rest/dist/server/model/errors'
import { ListingRequest, ListingResponse } from '../type/Listing'
import { StepService } from './StepService'
import { sequelize } from '../db'
import { ListingRepository } from '../repository/ListingRepository'

export class ListingService {
  public async update(decoded: Decoded, listingId: number, listingCrud: ListingRequest): Promise<ListingResponse> {
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

      await stepService.updateStepsByListingId(listingId, listingCrud.steps, transaction)

      const listingResponseList: ListingResponse[] = await listingRepository.findByIdIncludedSubsidiaryAndCountryAndCompany(listingId)

      await transaction.commit()

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