import express, { json, Router, urlencoded } from 'express'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import { errorHandler } from 'middleware/error'
import { notFoundHandler } from 'middleware/notfound'
import { logHandler } from 'middleware/log'
import { registerEvents } from 'controllers/events'
import { registerImages } from 'controllers/images'

const app = express()
const router = Router()

// configure express app
app.use(helmet())
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(logHandler)

// add static files
app.use('/static', express.static(path.join(__dirname, '..', 'public')))

// add routes before error handlers
router.get('/', (req, res) => {
  res.send('Devcon API')
})

registerEvents(router)
registerImages(router)

// add handlers after routes
app.use('/', router)
app.use(errorHandler)
app.use(notFoundHandler)

export default app
