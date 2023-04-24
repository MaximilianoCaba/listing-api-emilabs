import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'

export class Company extends Model {
  public id!: number
  public name: string
  public logo: string
  public readonly createdAt: number
  public readonly updatedAt: number
}

Company.init(
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
    tableName: 'companies',
    sequelize,
  }
)