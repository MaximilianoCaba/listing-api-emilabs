import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'

export class Listing extends Model {
  public id!: number
  public companyName: string
  public companyLogo: string
  public name: string
  public description: string
  public criteria: string
  public info: string
  public state: string
  public gs: string
  public subsidiaryId: number
  public readonly createdAt: number
  public readonly updatedAt: number
}

Listing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      field: 'company_name'
    },
    companyLogo: {
      type: DataTypes.STRING,
      field: 'company_logo'
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    criteria: {
      type: DataTypes.STRING,
    },
    info: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    gs: {
      type: DataTypes.STRING,
    },
    subsidiaryId: {
      type: DataTypes.INTEGER,
      field: 'subsidiary_id'
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
    tableName: 'listings',
    sequelize,
  }
)