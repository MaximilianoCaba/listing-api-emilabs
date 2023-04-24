import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'

export class Country extends Model {
  public id!: number
  public name: string
  public code: string
  public readonly createdAt: number
  public readonly updatedAt: number
}

Country.init(
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
    code: {
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
    tableName: 'countries',
    sequelize,
  }
)