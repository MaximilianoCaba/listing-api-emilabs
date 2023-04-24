import express, { Application } from 'express'
import { getConfig } from './config/config'
import http from 'http'
import { Server } from 'typescript-rest'
import * as Controllers from '../src/controllers'
import { HttpError } from 'typescript-rest/dist/server/model/errors'
import { authMiddleware } from './middleware/auth'

function configurationApp(): Application {
  const app: Application = express()

  app.use(authMiddleware)

  Object.values(Controllers).map((controller) => {
    Server.buildServices(app, controller)
  })

  // format error to JSON
  // eslint-disable-next-line consistent-return
  app.use((err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof HttpError){
      if (res.headersSent) {
        return next(err)
      }
      res.set('Content-Type', 'application/json')
      res.status(err.statusCode)
      res.json({ error : err.message, code: err.statusCode })
    } else {
      next(err)
    }
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


