import passport, { type DoneCallback } from "passport";
import passportLocal, { VerifyFunction } from 'passport-local';
import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const LocalStrategy = passportLocal.Strategy

passport.use(new LocalStrategy(
  (async (username: string, password: string, done: DoneCallback) => {
    try {
      const user = await prisma.user.findUnique({
        where: { username }
      })
      if (!user) return done(null, false)
      const match = await bcrypt.compare(password, user.password)
      if (!match) return done(null, false)
      return done(null, user)
    } catch (e) { return done(e) }
  }) as VerifyFunction
))

passport.serializeUser((user, done) => {
  done(null, 'id' in user && user.id)
})

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    })
    done(null, user)
  } catch(err) { done(err) }
})
