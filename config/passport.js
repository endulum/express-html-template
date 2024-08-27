const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const queries = require('../src/database/queries')

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await queries.getUserByUsername(username)
      if (!user) return done(null, false, {
        message: 'No user with that username exists.'
      })
      const match = await bcrypt.compare(password, user.password)
      if (!match) return done(null, false, { message: 'Incorrect password' })
      return done(null, user)
    } catch (e) { return done(e) }
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await queries.getUserById(id)
    done(null, user)
  } catch(err) { done(err) }
})
