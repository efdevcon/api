import swaggerAutogen from 'swagger-autogen'
import { API_INFO, SERVER_CONFIG } from 'utils/config'

console.log('Generate Swagger docs..')
const doc = {
  info: {
    title: API_INFO.title,
    description: API_INFO.description,
    version: API_INFO.version,
    contact: {
      email: API_INFO.email,
    },
    license: {
      name: API_INFO.license,
    },
    externalDocs: {
      url: API_INFO.repository,
    },
  },
  host: process.env.NODE_ENV === 'production' || process.env.RENDER ? API_INFO.host : 'localhost:3000',
  schemes: process.env.NODE_ENV === 'production' || process.env.RENDER ? ['https'] : ['http'],
}
const outputFile = './definition.json'
const endpointsFiles = ['../routes', '../controllers/*.ts']

console.log('API Info', doc)
swaggerAutogen(outputFile, endpointsFiles, doc)
