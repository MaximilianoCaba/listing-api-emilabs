import { ListingService } from '../src/services/ListingService'
import { UserAuth } from '../src/type/UserAuth'
import { ListingRequest } from '../src/type/Listing'
import { NotFoundError } from 'typescript-rest/dist/server/model/errors'

describe('ListingService', () => {

  test('when have decode, listingCrud and listingId valid, update and return listing associated', async () => {
    const decoded: UserAuth = {
      user: {
        subsidiaryId: 1
      },
      authorities : [ 'ROLE_EMPLOYEE' ]
    }

    const listingCrud: ListingRequest = {
      'companyName': 'emilabs',
      'steps': [ 
        {
          'id': 5,
          'flowId': 1,
          'name': 'paso',
          'step': {
            'fistStep': 'test',
            'secondStep': 'test'
          }
        }
      ]
    }

    const listingService = new ListingService()
    const listingResult = await listingService.update(decoded, 1, listingCrud)

    expect(listingResult).toEqual({
      'subsidiaryId': 1,
      'countryName': 'Argentina',
      'countryCode': 'AR',
      'subsidiaryName': 'Subsidiary A',
      'subsidiaryLogo': 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
      'id': 1,
      'companyName': 'emilabs',
      'companyLogo': 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
      'name': 'Listing A',
      'description': 'Some Listing',
      'criteria': 'some criteria',
      'info': 'some info',
      'state': 'ACTIVE',
      'gs': '',
      'platformListings': 1
    })
  })

  test('when listing doesnt exist, throw error', async () => {
    const decoded: UserAuth = {
      user: {
        subsidiaryId: 1
      },
      authorities : [ 'ROLE_EMPLOYEE' ]
    }

    const listingCrud: ListingRequest = { steps: [] }

    const listingService = new ListingService()
    await expect(() => listingService.update(decoded, 999, listingCrud)).rejects.toThrow(
      new NotFoundError('Listing Not Found')
    )
  })

  test('when user.subsidiaryId not is equal to listing.subsidiaryId, throw error', async () => {
    const decoded: UserAuth = {
      user: {
        subsidiaryId: 999
      },
      authorities : [ 'ROLE_EMPLOYEE' ]
    }

    const listingCrud: ListingRequest = { steps: [] }

    const listingService = new ListingService()
    await expect(() => listingService.update(decoded, 1, listingCrud)).rejects.toThrow(
      new NotFoundError('Listing Not Found')
    )
  })

})