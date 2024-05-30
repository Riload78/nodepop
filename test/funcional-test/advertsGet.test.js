const supertest = require('supertest')
const mongoose = require('mongoose')
const jwtAuth = require('../../lib/jwtAuthMiddleware')
const app = require('../../app')
const api = supertest(app)
const { describe, it, expect } = require('@jest/globals')


describe('Adverts API GET', () => {
  let token
  beforeAll(async () => {
    const res = await api
      .post('/apiv1/auth')
      .send({ email: 'user@example.com', password: '1234' })
    token = res.body.token
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
  it('Api Get should be retorned a token not found', async () => {
    const res = await api.get('/apiv1/anuncios')
    expect(res.body.error).toStrictEqual({
      message: 'Token not found',
    })
  })
  it('Api Get should be retorned an Authorization Error', async () => {
    const res = await api
      .get('/apiv1/anuncios')
      .set('Authorization', 'fjsdfjsdjsd')
      .expect(200)
    expect(res.body.error).toStrictEqual({
      message: 'Unauthorized',
    })
  })

  it('Api should be returning Adverts', async () => {
    const res = await api
    .get('/apiv1/anuncios')
    .set('Authorization', token)
    .expect(200) 
  })
})