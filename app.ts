console.warn(`In ${process.env.NODE_ENV} mode...`);

import dotenv from "dotenv";
dotenv.config({ path: ".env." + process.env.NODE_ENV });

if (
  process.env.DATABASE_URL === undefined ||
  process.env.DATABASE_URL.trim() === ""
) {
  throw new Error("Database URL is not defined.");
}

if (
  process.env.SESSION_SECRET === undefined ||
  process.env.SESSION_SECRET.trim() === ""
) {
  throw new Error("Session secret is not defined.");
}

import "./config/passport";
import express from "express";
import session from "express-session";
import asyncHandler from "express-async-handler";
import path from "path";
import flash from "connect-flash";
import passport from "passport";

import errorHandler from "./src/middleware/errorHandler";
import { router as authRouter } from "./src/routes/authRouter";
import { router as mainRouter } from "./src/routes/mainRouter";

import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";

const app = express();

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(
  asyncHandler(async (req, res, next) => {
    res.locals.user = req.user;
    res.locals.warning = req.flash("warning");
    res.locals.success = req.flash("success");
    if (req.user) return mainRouter(req, res, next);
    else return authRouter(req, res, next);
  })
);

app.use(errorHandler);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.warn(`⚡️ server starting at http://localhost:${port}`);
});
