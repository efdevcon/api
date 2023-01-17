import express, { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { errorHandler } from 'middleware/error'
import { notFoundHandler } from 'middleware/notfound'

// configure express app
const app = express()
app.use(helmet())
app.use(cors())
app.use(json())
app.use(express.urlencoded({ extended: true }))

// add routes before error handlers
app.get('/', (req, res) => {
  res.send('Hello world!')
})

// add error handlers after routes
app.use(errorHandler)
app.use(notFoundHandler)

export default app
