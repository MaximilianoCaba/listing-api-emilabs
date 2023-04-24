import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'

export class Step extends Model {
  public id!: number
  public listingId: number
  public flowId: number
  public name: string
  public step: unknown
  public listingFlow: unknown
  public readonly createdAt: number
  public readonly updatedAt: number
}

Step.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    listingId: {
      type: DataTypes.INTEGER,
    },
    flowId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    step: {
      type: DataTypes.JSON,
    },
    listingFlow: {
      type: DataTypes.JSON,
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
    tableName: 'Steps', // we need to rename to steps
    sequelize,
  }
)