import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'

export class Subsidiary extends Model {
  public id!: number
  public name: string
  public logo: string
  public countryId!: number
  public companyId!: number
  public readonly createdAt: number
  public readonly updatedAt: number
}

Subsidiary.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    logo: {
      type: DataTypes.STRING,
    },
    countryId: {
      type: DataTypes.INTEGER,
      field: 'country_id'
    },
    companyId: {
      type: DataTypes.INTEGER,
      field: 'company_id'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },
  {
    tableName: 'subsidiaries',
    sequelize,
  }
)