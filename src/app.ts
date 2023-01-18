import express, { json, Router, urlencoded } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { errorHandler } from 'middleware/error'
import { notFoundHandler } from 'middleware/notfound'
import { logHandler } from 'middleware/log'
import { registerEvents } from 'controllers/events'

// configure express app
const app = express()
const router = Router()
app.use(helmet())
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(logHandler)

// add routes before error handlers
router.get('/', (req, res) => {
  res.send('Devcon API')
})

registerEvents(router)

// add handlers after routes
app.use('/', router)
app.use(errorHandler)
app.use(notFoundHandler)

export default app
