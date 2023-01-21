import swaggerAutogen from 'swagger-autogen'
import { TITLE, API_VERSION, SERVER_CONFIG, DEFAULT_HOST } from 'utils/config'

console.log('Generate Swagger docs..')
const doc = {
  info: {
    title: TITLE,
    version: API_VERSION(),
  },
  host: SERVER_CONFIG.NODE_ENV === 'development' ? 'localhost:3000' : DEFAULT_HOST,
  schemes: SERVER_CONFIG.NODE_ENV === 'development' ? ['http'] : ['https'],
}
const outputFile = './definition.json'
const endpointsFiles = ['../routes', '../controllers/events']

swaggerAutogen(outputFile, endpointsFiles, doc)
