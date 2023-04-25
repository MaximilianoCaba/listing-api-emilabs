import { Decoded } from '../type/Decoded'
import jwt from 'jsonwebtoken'
import { getConfig } from '../config/config'

function generateToken(): void {
  const { apiSecretKey } = getConfig()
  const decoded: Decoded = {
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