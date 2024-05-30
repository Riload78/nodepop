const supertest = require('supertest')
const mongoose = require('mongoose')
const { Anuncio } = require('../../models')
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
    expect(res.body).toHaveProperty('data')
  })

  it('Api should be returning Error 404', async () => {
    const res = await api
      .get('/apiv1/anuncios/123')
      .set('Authorization', token)
      .expect(400)
    expect(res.body.error).toContain('Cast to ObjectId failed')
  })

  it('Api should be returning a Advert', async () => {
    const advert = await Anuncio.findOne({})
    const res = await api
      .get(`/apiv1/anuncios/${advert._id}`)
      .set('Authorization', token)
      .expect(200)
    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toHaveProperty('_id')
    
  })

})