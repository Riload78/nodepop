const supertest = require('supertest')
const mongoose = require('mongoose')
const { Anuncio } = require('../../models')
const app = require('../../app')
const api = supertest(app)
const { describe, it, expect } = require('@jest/globals')

describe('Adverts API PUT', () => {
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

	it('Api Put should be retorned a token not found', async () => {
		const res = await api
			.put('/apiv1/anuncios')
			.send({ nombre: 'test 01' })
			.expect(200)
		expect(res.body.error).toStrictEqual({
			message: 'Token not found',
		})
	})
	it('Api Put should be retorned an Authorization Error', async () => {
		const res = await api
			.put('/apiv1/anuncios')
			.send({ nombre: 'test 01' })
			.set('Authorization', 'fjsdfjsdjsd')
			.expect(200)
		expect(res.body.error).toStrictEqual({
			message: 'Unauthorized',
		})
	})
	it('Api should be returning Adverts', async () => {
		const advert = await Anuncio.findOne({})
		advert.nombre='test 01 updated'
		const res = await api
      .put(`/apiv1/anuncios/${advert._id}`)
      .send(advert)
      .set('Authorization', token)
      .expect(200)
		expect(res.body.status).toBe('success')
	})
	it('Api should be retur an error id name not found', async () => {
		const advert = await Anuncio.findOne({})
    advert.nombre = 'test'
		const res = await api
      .put(`/apiv1/anuncios/${advert._id}`)
      .send(advert)
      .set('Authorization', token)
      .expect(200)
		expect(res.body.error).toStrictEqual({
			message: 'The id is not valid',
		})
	})
})
