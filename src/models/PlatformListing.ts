import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'

export class PlatformListing extends Model {
  public id!: number
  public listingId: string
  public state: string
  public readonly createdAt: number
  public readonly updatedAt: number
}

PlatformListing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    listingId: {
      type: DataTypes.INTEGER,
      field: 'listing_id'
    },
    state: {
      type: DataTypes.STRING,
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
    tableName: 'platform_listings',
    sequelize,
  }
)