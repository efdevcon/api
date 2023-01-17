import { SERVER_CONFIG } from 'utils/config'
import app from 'app'

app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`[SERVER]: Listening on port ${SERVER_CONFIG.PORT}`)
})
