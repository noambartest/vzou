import { TWOFA_Attributes, TWOFA_Input } from '../types/TWOFA_Types.js'
import { sequelize } from '../db.js'
import { DataTypes, Model } from 'sequelize'


class TWOFA extends Model<TWOFA_Attributes, TWOFA_Input> implements TWOFA_Attributes {
  public email!: string
  public code!: string
  public type!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

TWOFA.init({
  email: { type: DataTypes.STRING, references: { model: 'Users', key: 'email' }, primaryKey: true },
  code: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false }

}, {
  timestamps: true,
  sequelize: sequelize
})

export default TWOFA