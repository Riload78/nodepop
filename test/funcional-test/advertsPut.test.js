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
})
