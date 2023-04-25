import { Decoded } from '../type/Decoded'
import { BadRequestError, NotFoundError } from 'typescript-rest/dist/server/model/errors'
import { ListingCrud } from '../type/ListingCrud'
import { StepService } from './StepService'
import { sequelize } from '../db'
import { ListingRepository } from '../repository/ListingRepository'
import { ListingResponse } from '../type/ListingResponse'

export class ListingService {
  public async update(decoded: Decoded, listingId: number, listingCrud: ListingCrud): Promise<ListingResponse> {
    const transaction = await sequelize.transaction()
    try {

      const listingRepository = new ListingRepository()
      const listing = await listingRepository.findById(listingId)

      if (!listing) {
        throw new NotFoundError('Listing Not Found')
      }

      if(decoded.user.subsidiaryId !== listing.subsidiaryId) {
        throw new NotFoundError('Listing Not Found')
      }

      await listingRepository.update(listing, listingCrud)

      const stepService = new StepService()

      await stepService.updateStepsByListingId(listingId, listingCrud.steps)

      const response = await listingRepository.findByIdIncludedSubsidiaryAndCountryAndCompany(listingId)

      await transaction.commit()

      return response
    } catch (error) {
      await transaction.rollback()
      if(error instanceof NotFoundError) {
        throw error
      }
      throw new BadRequestError(error.message)
    }
  }
}