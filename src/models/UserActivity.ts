import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db.js'
import { UserActivityAttributes, UserActivityInput } from '../types/UserActivityTypes.js'


class UserActivity extends Model<UserActivityAttributes, UserActivityInput> implements UserActivityAttributes {
  public userID!: number
  public subject!: string
  public algorithm!: string
  public actionDate!: Date
  public quantity !: number
}

UserActivity.init({
  userID: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'id' },primaryKey: true },
  subject: { type: DataTypes.STRING,primaryKey: true, allowNull: false },
  algorithm: { type: DataTypes.STRING, primaryKey: true,allowNull: false},
  actionDate: { type: DataTypes.DATEONLY, primaryKey: true,allowNull: false },
  quantity: { type: DataTypes.INTEGER,allowNull: false,defaultValue: 1 }
}, {
  sequelize: sequelize,
  timestamps: false 
})

export default UserActivity