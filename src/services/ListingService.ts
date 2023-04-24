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

      await listing.update({
        companyName: listingCrud.companyName || listing.companyName,
        companyLogo: listingCrud.companyLogo || listing.companyLogo,
        name: listingCrud.name || listing.name,
        description: listingCrud.description || listing.description,
        info: listingCrud.info || listing.info,
        state: listingCrud.state || listing.state,
        gs: listingCrud.gs || listing.gs,
        criteria: listingCrud.criteria || listing.criteria,
      })

      const stepService = new StepService()

      await stepService.updateStepsByListingId(listingId, listingCrud.steps)

      const response = await listingRepository.findByIdIncludedSubsidiaryAndCountryAndCompany(listingId)

      await transaction.commit()

      return response
    } catch (error) {
      await transaction.rollback()
      throw new BadRequestError(error.message)
    }
  }
}