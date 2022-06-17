const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testRouter = require('./controllers/testing')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('Conneting to database at ', config.MONGODB_URI)
console.log("MONGODB URI", config.MONGODB_URI)
mongoose.connect(
  config.MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true }
).then(() => {
  logger.info('Connected to MongoDB successfully!')
}).catch((error) =>
  logger.error('Error connecting to MongoDB: ', error.message))

app.use(cors())
app.use(express.static('frontend/build'))
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/testing', testRouter)
app.get('/health', (req, res) => {
  res.send("ok")
})
app.get('/version', (req, res) => {
  res.send('1')
})
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app
