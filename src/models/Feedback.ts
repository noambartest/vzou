import { sequelize } from '../db.js'
import { DataTypes, Model } from 'sequelize'
import { FeedBackAttrs, FeedBackInput } from '../types/FeedbackTypes.js'


class Feedback extends Model<FeedBackAttrs, FeedBackInput> implements FeedBackAttrs {
       public id!: number
       public subject!: string
       public message!: string
       public contactInfo!: string
       // timestamps!
       public readonly createdAt!: Date
       public readonly updatedAt!: Date
}

Feedback.init({
       id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
       message: { type: DataTypes.STRING, allowNull: false },
       contactInfo: { type: DataTypes.STRING, defaultValue: '' },
       subject: { type: DataTypes.STRING, allowNull: false},
       createdAt: { type: DataTypes.DATE, allowNull: false },
       updatedAt: { type: DataTypes.DATE, allowNull: false }

}, {
       timestamps: true,
       sequelize: sequelize,
})

export default Feedback
