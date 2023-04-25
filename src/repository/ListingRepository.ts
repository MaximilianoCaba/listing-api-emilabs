import { Listing } from '../models/Listing'
import { sequelize } from '../db'
import { ListingCrud } from '../type/ListingCrud'
import { ListingResponse } from '../type/ListingResponse'

export class ListingRepository {
  public async findById(id: number): Promise<Listing | null> {
    return Listing.findOne({
      where: {
        id,
      },
    })
  }
  
  public async update(listing: Listing, listingCrud: ListingCrud): Promise<Listing> {
    return listing.update({
      companyName: listingCrud.companyName || listing.companyName,
      companyLogo: listingCrud.companyLogo || listing.companyLogo,
      name: listingCrud.name || listing.name,
      description: listingCrud.description || listing.description,
      info: listingCrud.info || listing.info,
      state: listingCrud.state || listing.state,
      gs: listingCrud.gs || listing.gs,
      criteria: listingCrud.criteria || listing.criteria,
    })
  }

  public async findByIdIncludedSubsidiaryAndCountryAndCompany(listingId: number): Promise<ListingResponse[]> {
    const queryResult = await sequelize.query(`
        SELECT
            Subsidiary.id as subsidiaryId,
            Country.name as countryName,
            Country.code as countryCode,
            COALESCE(Subsidiary.name, Company.name) as subsidiaryName,
            COALESCE(Subsidiary.logo, Company.logo) as subsidiaryLogo,
            Listing.id,
            Listing.company_name as companyName,
            Listing.company_logo as companyLogo,
            Listing.name,
            Listing.description,
            Listing.criteria,
            Listing.info,
            Listing.state,
            Listing.gs,
            CAST(COALESCE(PlatformListing.platform_listings, 0) AS INTEGER) as platformListings
        FROM
            listings AS Listing
                LEFT OUTER JOIN subsidiaries AS Subsidiary ON Listing.subsidiary_id = Subsidiary.id
                LEFT OUTER JOIN countries AS Country ON Subsidiary.country_id = Country.id
                LEFT OUTER JOIN companies AS Company ON Subsidiary.company_id = Company.id
                LEFT OUTER JOIN (
                SELECT l.listing_id as lid, count(*) as platform_listings FROM platform_listings as l
                WHERE l.state = 'ACTIVE'
                GROUP BY lid) AS PlatformListing ON Listing.id = PlatformListing.lid
        WHERE Listing.id = ${listingId}
    `)

    const [ listings ] = queryResult
    return listings as ListingResponse[]
  }
}