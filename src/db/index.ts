import { Sequelize } from 'sequelize'
import { getConfig } from '../config/config'

const { databaseConfig } = getConfig()

const { database, user, pass, host } = databaseConfig

export const sequelize = new Sequelize(database, user, pass, {
  host,
  dialect: 'postgres'
})