import { sequelize } from '../db.js'
import { DataTypes, Model } from 'sequelize'
import { IUserRegister, UserAttributes } from '../types/UserTypes.js'


class User extends Model<UserAttributes, IUserRegister> implements UserAttributes {
  public id!: number
  public email!: string
  public firstName!: string
  public lastName!: string
  public gender!: string
  public birthYear!: number
  public role!: string
  public lastSeen!: Date
  public password!: string
  public isEnabled2FA!: boolean
  public isEmailConfirmed!: boolean

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false,validate:{isEmail:true} },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false,defaultValue: 'Unknown' },
  birthYear: { type: DataTypes.INTEGER, allowNull: false ,defaultValue: 2000, validate:{min:new Date().getFullYear()-120,max:new Date().getFullYear()-16}},
  isEnabled2FA: { type: DataTypes.BOOLEAN, defaultValue: false },
  isEmailConfirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
  lastSeen: { type: DataTypes.DATE, allowNull: false  },
  role: { type: DataTypes.STRING, defaultValue: 'Student' },
}, {
  timestamps: true,
  sequelize: sequelize,
})

export default User
