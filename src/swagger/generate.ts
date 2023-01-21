import swaggerAutogen from 'swagger-autogen'

console.log('Generate Swagger docs..')
const outputFile = './definition.json'
const endpointsFiles = ['../routes', '../controllers/events']

swaggerAutogen(outputFile, endpointsFiles)
