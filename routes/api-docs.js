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
          summary: 'Get all Ads',
          description: 'Returns a list of all available anuncios on the platform.',
          operationId: 'getAnuncios',
          parameters: [
            {
              name: 'nombre',
              in: 'query',
              description: 'Filter by name',
              schema: {
                type: 'string'
              }
            },
            {
              name: 'tags',
              in: 'query',
              description: 'Filter by tag. To filter by more tags, separate them with a ","',
              schema: {
                type: 'string'
              }
            },
            {
              name: 'venta',
              in: 'query',
              description: 'Filter by true or false. Filter ads that are for sale (venta=true) or in search (venta=false)',
              schema: {
                type: Boolean
              }
            },
            {
              name: 'precio',
              in: 'query',
              description: 'price range (min. price and max. price), we can use a parameter in the query string named price that has one of these combinations: 10-50 will search for ads with price included between these values. 10- will look for those with a price greater than 10. -50 will look for those with a price less than 50. 50 will look for those with a price equal to 50',
              schema: {
                type: 'string'
              }

            },
            {
              name: 'skip',
              in: 'query',
              description: 'Number of records to skip.',
              schema: {
                type: 'integer'
              }
            },
            {
              name: 'limit',
              in: 'query',
              description: 'Max number of record to return.',
              schema: {
                type: 'integer'
              }
            },
            {
              name: 'sort',
              in: 'query',
              description: 'Sort property. Prefix with "-" for descending. For more one sort, separate with space',
              schema: {
                type: 'string'
              }
            }
          ],
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
        },
        post: {
          tags: ['Anuncios'],
          summary: 'Create new ad',
          description: 'Creates a new ad. At the moment, set field "image" to "demo.jpg". Uploaded image is under construction',
          operationId: 'createAnuncio',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Anuncio'
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Created. The request has been fulfilled and resulted in one or more new resources being created.',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Anuncio'
                  }
                }
              }
            },
            400: {
              description: 'Bad Request. Invalid input data.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/anuncios/{id}': {
        get: {
          tags: ['Anuncios'],
          summary: 'Get ad by id',
          operationId: 'getAnuncio',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Advertisement id.',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            200: {
              description: 'Created. The request has been fulfilled and resulted in one or more new resources being created.',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Anuncio'
                  }
                }
              }
            },
            400: {
              description: 'Bad Request. Invalid input data.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        put: {
          tags: ['Anuncios'],
          summary: 'Update an existing advertisement',
          operationId: 'updateAnuncio',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Advertisement id.',
              schema: {
                type: 'string'
              }
            }
          ],
          requestBody: {
            description: 'Updated information of the advertisement.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Anuncio'
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Created. The request has been fulfilled and resulted in one or more new resources being created.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: {
                        type: 'string'
                      },
                      message: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Bad Request. Invalid input data.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Anuncios'],
          summary: 'Delete a specific advertisement',
          operationId: 'deleteAnuncio',
          parameters: [{
            name: 'id',
            in: 'path',
            required: true,
            description: 'The id of the advertisement to be deleted',
            schema: {
              type: 'string'
            }
          }],
          responses: {
            200: {
              description: 'Successful deletion.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: {
                        type: 'string'
                      },
                      message: {
                        type: 'string'
                      }
                    }
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
