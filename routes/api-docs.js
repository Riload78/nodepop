const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      version: '1.0.0',
      title: 'NodePOP API Documentation',
      description: 'API that will run on the server of a service selling articles second.The service maintains advertisements for the purchase or sale of items and allows you to search and filter by various criteria',
      termsOfService: 'http://swagger.io/terms/',
      contact: {
        name: 'Ricardo',
        email: 'ricardovlmmarcos@gmail.com',
        url: 'https://github.com/riload78'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/apiv1/'
      }
    ],
    tags: [
      {
        name: 'Anuncios',
        description: 'Every end points about Anuncios',
        externalDocs: {
          description: 'Find out more',
          url: 'http://swagger.io'
        }
      }
    ],
    components: {
      schemas: {
        Anuncio: {
          type: 'object',
          // Definición del esquema para el modelo Anuncio
          properties: {
            nombre: { type: 'string', required: true },
            venta: { type: 'boolean', default: false, required: true },
            precio: { type: 'number', required: true },
            imagen: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } }
          }
        }
      }
    },
    paths: {
      '/anuncios': {
        get: {
          tags: [
            'Anuncios'
          ],
          summary: 'Get all anuncios',
          description: 'Returns a list of all available anuncios on the platform.',
          operationId: 'getAnuncios',
          responses: {
            200: {
              description: 'A list of anuncios.',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Anuncio'
                  }
                }
              }
            }
          }
        }
      },
			'/tags': {
				get: {
					tags: [
						'Tags'
					],
					summary: 'Tags List',
					description: 'Return a tags list fron all anuncios',
					operationId: 'gatTags',
					responses: {
						200: {
							description: 'Una lista de tags.',
							content: {
								'application/json': {
									schema: {
										$ref: '#/components/schemas/Anuncio'
									}
								}
							}
						}
					}
				}
			}
    }
  },
  basePath: '/apiv1/',
  apis: ['./routes/api.js'] // base path of your API,
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

module.exports = swaggerDocs
