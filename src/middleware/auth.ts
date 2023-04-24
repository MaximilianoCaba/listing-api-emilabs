import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getConfig } from '../config/config'

const { apiSecretKey } = getConfig()

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {

  if(req.path.toLowerCase().includes('auth')) {
    return next()
  }

  const token: string | undefined = req.headers[ 'authorization' ]

  if(!token) {
    res.status(400).send({ code: 400, error: 'User Not Found' })
    return next()
  }

  const jwtPayload = jwt.verify(token.split(' ')[1], apiSecretKey, {}) as JwtPayload
  const { subsidiaryId } = jwtPayload[ 'user' ]

  // is an iterator and doesn't possible to destructuring easily
  // eslint-disable-next-line prefer-destructuring
  const authorities: string[] = jwtPayload[ 'authorities' ]

  req.decoded = {
    user : {
      subsidiaryId
    },
    authorities
  }
  return next()
}