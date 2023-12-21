import request from 'supertest'
import { sequelize } from '../db.js'
import app from '../index.js'

let accessToken:string

describe('api/users', () => {
  beforeAll(async () => {
    await sequelize.authenticate()
    await sequelize.sync({force:true})

  })
  describe('POST /register', () => {
    it('Should return access token with status code 200', async () => {
      const res = await request(app)
        .post('/api/user/register')
        .send({
          email: 'eodinzov94@gmail.com',
          password: '12345678',
          firstName: 'test',
          lastName: 'test',
          gender: 'Male',
          birthYear: 1967,
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('token')
    })
    it('Should return error code 404, because user with this email already exists', async () => {
      const res = await request(app)
        .post('/api/user/register')
        .send({
          email: 'eodinzov94@gmail.com',
          password: '12345678',
          firstName: 'test',
          lastName: 'test',
          gender: 'Male',
          birthYear: 1967,
        })
      expect(res.statusCode).toEqual(404)
    })

  })
  describe('POST /login', () => {
    it('Should return access token with status code 200', async () => {
      const res = await request(app)
        .post('/api/user/login')
        .send({
          email: 'eodinzov94@gmail.com',
          password: '12345678',
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('token')
      accessToken = res.body.token
    })
    it('Should return error code 404, because password incorrect', async () => {
      const res = await request(app)
        .post('/api/user/login')
        .send({
          email: 'eodinzov94@gmail.com',
          password: '1234567',
        })
      expect(res.statusCode).toEqual(403)
    })
    it('Should return error code 404, because email incorrect', async () => {
      const res = await request(app)
        .post('/api/user/login')
        .send({
          email: 'eodinzov94@gmail.con',
          password: '12345678',
        })
      expect(res.statusCode).toEqual(403)
    })
  })
  describe('POST /update-user-data', () => {
    it('Should return status code 200', async () => {
      const res = await request(app)
        .post('/api/user/update-user-data')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          firstName:'Test22'
        })
      expect(res.statusCode).toEqual(200)
    })
    it('Should return error code 404, because no fields to update', async () => {
      const res = await request(app)
        .post('/api/user/update-user-data')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({})
      expect(res.statusCode).toEqual(404)
    })
    it('Should return error code 404, because email update is not allowed', async () => {
      const res = await request(app)
        .post('/api/user/update-user-data')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          email: 'eodinzov95@gmail.con',
        })
      expect(res.statusCode).toEqual(404)
    })

  })
  afterAll(async () => {
    await sequelize.close()
  })

})