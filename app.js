require('dotenv').config()
require('./config/passport')
const path = require('path')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const pool = require('./src/database/pool')

const logSession = require('./src/middleware/logSession')
const errorHandler = require('./src/middleware/errorHandler')
const sampleRouter = require('./src/routes/sampleRouter')

const app = express()

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: new (require('connect-pg-simple')(session))({ pool }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(logSession)

app.use(sampleRouter)
app.use(errorHandler)

app.listen(3000)