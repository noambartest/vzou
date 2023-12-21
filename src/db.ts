import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const DB_NAME = process.env.NODE_ENV === 'dev' ?process.env.TEST_DB_NAME!: process.env.DB_NAME! 
export const sequelize = new Sequelize(
  DB_NAME,
  process.env.DB_USER!,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: 5432
  
  }
)