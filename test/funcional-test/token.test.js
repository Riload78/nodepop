const { describe, it, expect } = require('@jest/globals')
const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)

describe('Api Login', () => {
  it('Api should be running error when user not exist', async () => {
    const res = await api
      .post('/apiv1/auth')
      .send({ email: 'p9Zd6@example.com', password: '123456' })
      .expect(200)
    expect(res.body.error).toBe('Wrong email or password')
  })
  it('Api should be running error when passwornd is wrong', async () => {
    const res = await api
      .post('/apiv1/auth')
      .send({ email: 'user@example.com', password: '1234567' })
      .expect(200)
    expect(res.body.error).toBe('Wrong email or password')
  })
  it('Api should be running a JWT', async () => {
    const res = await api
      .post('/apiv1/auth')
      .send({ email: 'user@example.com', password: '1234' })
      .expect(200)
    expect(res.body).toHaveProperty('token')
  })
})
