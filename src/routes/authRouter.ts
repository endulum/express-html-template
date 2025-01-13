import express from 'express';
import asyncHandler from 'express-async-handler';

import * as auth from '../controllers/auth';
import * as render from '../controllers/render';

const router = express.Router();

const catchAll = asyncHandler(async (_req, res) => {
  res.redirect('/login');
});

router.route('/login').get(render.login).post(auth.logIn);
router.route('/signup').get(render.signup).post(auth.signUp);
router.route('*').all(catchAll);

export { router };
