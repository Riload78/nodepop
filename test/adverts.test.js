const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);

describe ('Api', () => {
    it('Api should be running', async () => {
        await api.get('/apiv1/')
        .expect(200)
    })
    it('Api should be returning json', async () => {
        await api.get('/apiv1/')
            .expect('Content-Type', /json/)
    })
    it('Api should be returning message', async () => {
        const res = await api.get('/apiv1/')
        expect(res.body.message).toBe("Bienvenido a NodePOP API");
    })
    it('Api should be returning Error 404', async () => {
        const res = await api.get('/apiv1/force-error')
        expect(res.status).toBe(200)
        expect(res.body.error)
    })
})

describe("Adverts API", () => {
	it("Adverts should be retorned as json", async () => {
		await api
			.get("/apiv1/anuncios")
			.expect(200)
			.expect("Content-Type", /json/)
            
	});
});

afterAll(() => {
	mongoose.connection.close(); 
});
