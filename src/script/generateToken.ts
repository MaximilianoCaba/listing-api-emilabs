import { UserAuth } from '../type/UserAuth'
import jwt from 'jsonwebtoken'
import { getConfig } from '../config/config'

function generateToken(): void {
  const { apiSecretKey } = getConfig()
  const decoded: UserAuth = {
    user: {
      subsidiaryId: 1
    },
    authorities : [ 'ROLE_EMPLOYEE' ]
  }
  const token = jwt.sign(decoded, apiSecretKey)

  console.log('---TOKEN START---')
  console.log(token)
  console.log('---TOKEN END---')
}

generateToken()