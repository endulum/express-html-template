// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
// const bcrypt = require('bcryptjs')
// const queries = require('../src/database/queries')

import passport, { type DoneCallback } from "passport";
const LocalStrategy = require('passport-local').Strategy;
import bcrypt from 'bcryptjs';
import queries from "../src/database/queries";

passport.use(new LocalStrategy(
  async (username: string, password: string, done: DoneCallback) => {
    try {
      const user = await queries.getUserByUsername(username)
      if (!user) return done(null, false)
      const match = await bcrypt.compare(password, user.password)
      if (!match) return done(null, false)
      return done(null, user)
    } catch (e) { return done(e) }
  }
))

passport.serializeUser((user, done) => {
  done(null, 'id' in user && user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await queries.getUserById(id)
    done(null, user)
  } catch(err) { done(err) }
})
