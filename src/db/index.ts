import { Sequelize } from 'sequelize'
import { getConfig } from '../config/config'

function getSequelize(): Sequelize {
  const { databaseConfig, nodeEnv } = getConfig()
  const { database, user, pass, host } = databaseConfig
  if (nodeEnv === 'test') {
    return new Sequelize('sqlite::memory:')
  }
  return new Sequelize(database, user, pass, {
    host,
    dialect: 'postgres',
    logging: false
  })
}

export const sequelize = getSequelize()