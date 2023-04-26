import express, { Application } from 'express'
import { getConfig } from './config/config'
import http from 'http'
import { Server } from 'typescript-rest'
import * as Controllers from '../src/controllers'
import { HttpError } from 'typescript-rest/dist/server/model/errors'
import { expressjwt } from 'express-jwt'

function configurationApp(): Application {
  const app: Application = express()

  const { apiSecretKey } = getConfig()

  app.use(expressjwt({
    secret: apiSecretKey,
    algorithms: [ 'HS256' ]
  }))

  Object.values(Controllers).map((controller) => {
    Server.buildServices(app, controller)
  })

  // format error to JSON
  // eslint-disable-next-line consistent-return
  app.use((err: Error, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    let code = 500
    if (err instanceof HttpError){
      code = err.statusCode
    }
    if (err.name && err.name === 'UnauthorizedError'){
      code = 401
    }
    res.set('Content-Type', 'application/json')
    res.status(code)
    res.json({ error : err.message, code })
    next()
  })
  return app
}

export function start(): http.Server {
  const app = configurationApp()
  const { nodeEnv, serverPort } = getConfig()
  return app.listen(serverPort, function () {
    if (nodeEnv !== 'test') {
      console.info(`Server listening on PORT ${serverPort}, mode: ${nodeEnv}`)
    }
  })
}


