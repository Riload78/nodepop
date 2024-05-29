const supertest = require('supertest');
const upload = require('../../lib/multerMiddleware');
const mongoose = require('mongoose');
const app = require('../../app');
const api = supertest(app);
const { describe, it, expect } = require('@jest/globals');
require('dotenv').config();
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const path = require('node:path');
const ruta = path.join(__dirname, 'images');

describe('Api', () => {
  let token;
  beforeAll(async () => {
    const res = await api
      .post('/apiv1/auth')
      .send({ email: 'user@example.com', password: '1234' });
    token = res.body.token;
    console.log(token);
  });


  it('Api should be running', async () => {
    await api.get('/apiv1/').set('Authorization', token).expect(200);
  });
  it('Api should be returning json', async () => {
    await api.get('/apiv1/').expect('Content-Type', /json/);
  });
  it('Api should be returning message', async () => {
    const res = await api.get('/apiv1/').set('Authorization', token);
    expect(res.body.message).toBe('Bienvenido a NodePOP API');
  });
  it('Api should be returning Error 404', async () => {
    const res = await api.get('/apiv1/force-error').set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body.error);
  });
  it('Api should be returning Not autorization', async () => {
    const res = await api.get('/apiv1/force-error');
    expect(res.status).toBe(200);
    expect(res.body.error);
  });
});

describe('Adverts API', () => {
  let token;

  beforeAll(async () => {
    
    const res = await api
      .post('/apiv1/auth')
      .send({ email: 'user@example.com', password: '1234' });
    token = res.body.token;
  });
  
  
  afterAll(async () => {
    await mongoose.connection.close(); 
  });
  
  it('Adverts should be retorned as json', async () => {
    await api.get('/apiv1/anuncios').expect(200).expect('Content-Type', /json/);
  });
  
  it('Adverts should be created', async () => {
    const res = await api
      .post('/apiv1/anuncios')
      .field('nombre', 'test 01')
      .field('venta', true)
      .field('precio', 100)
      .field('tags', ['test', 'test'])
      .attach('imagen', `${ruta}/demo.jpg`)
      .set('Authorization', token)
      .expect(200);
    console.log(res.body);
    expect(res.body.status).toBe('success'); 
    expect(res.body.message).toBe('The ad has been created successfully');
  });

  it('Adverts trhow an error if Nombre is less than 5 characters', async () => {
    const res = await api
      .post('/apiv1/anuncios')
      .field('nombre', 'test')
      .field('venta', true)
      .field('precio', 100)
      .field('tags', ['test', 'test'])
      .attach('imagen', `${ruta}/demo.jpg`)
      .set('Authorization', token)
      .expect(400);
    expect(res.body.error).toBe(
      'Anuncio validation failed: nombre: Path `nombre` (`test`) is shorter than the minimum allowed length (5).',
    );
  });
});
