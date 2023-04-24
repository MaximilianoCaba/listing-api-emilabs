import { Path, POST } from 'typescript-rest'
import jwt from 'jsonwebtoken'
import { getConfig } from '../config/config'
import { Decoded } from '../type/Decoded'

const { apiSecretKey } = getConfig()


@Path('/auth')
export class AuthController {
  @POST
  @Path('/token')
  public authenticate(): { token: string } {
    const decoded: Decoded = {
      user: {
        subsidiaryId: 1
      },
      authorities : [ 'ROLE_EMPLOYEE' ]
    }

    const token = jwt.sign(decoded, apiSecretKey)

    return { token }
  }
}