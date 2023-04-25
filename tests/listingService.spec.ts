import { ListingService } from '../src/services/ListingService'
import { Decoded } from '../src/type/Decoded'
import { ListingCrud } from '../src/type/ListingCrud'

describe('ListingService', () => {

  it('should create a new company', async () => {
    const decoded: Decoded = {
      user: {
        subsidiaryId: 1
      },
      authorities : [ 'ROLE_EMPLOYEE' ]
    }

    const listingCrud: ListingCrud = {
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

    expect(listingResult).toBeDefined()
  })

})