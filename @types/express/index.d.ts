import { Decoded } from '../../src/type/Decoded'

declare global{
  namespace Express {
    interface Request {
      decoded?: Decoded
    }
  }
}