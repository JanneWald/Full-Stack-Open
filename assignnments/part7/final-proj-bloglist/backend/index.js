/*
Actual running head of backend with node --watch index.js

Presses the "start button" on our express server with the port listed in our config
*/
const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
