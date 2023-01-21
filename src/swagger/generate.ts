import swaggerAutogen from 'swagger-autogen'
import { TITLE, API_VERSION } from 'utils/config'

console.log('Generate Swagger docs..')
const doc = {
  info: {
    title: TITLE,
    version: API_VERSION(),
  },
}
const outputFile = './definition.json'
const endpointsFiles = ['../routes', '../controllers/events']

swaggerAutogen(outputFile, endpointsFiles, doc)
