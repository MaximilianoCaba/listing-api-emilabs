type NodeEnv = 'production' | 'development' | 'test'

type ApiConfig = {
  nodeEnv: string
  serverPort: number
  apiSecretKey: string
  databaseConfig: {
    database: string
    user: string
    pass: string
    host: string
  },
  csvChunkProcess: number
}

export function getConfig(): ApiConfig {
  return {
    nodeEnv: process.env.NODE_ENV
      ? (process.env.NODE_ENV as NodeEnv)
      : 'development',
    serverPort: process.env.SERVER_PORT ?  + process.env.SERVER_PORT : 3000,
    apiSecretKey: process.env.apiSecretKey || 'U8jfiEOOUdecC23456tMlAR213652RYEcM1nXunrt2382',
    databaseConfig: {
      database: 'node_refactor',
      user: 'postgres',
      pass: '123456',
      host: 'localhost'
    },
    csvChunkProcess: 5000
  }
}