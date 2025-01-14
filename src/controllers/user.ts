import asyncHandler from 'express-async-handler';
import { body } from 'express-validator';

import { usernameValidation } from '../common/usernameValidation';
import { validate } from '../middleware/validate';
import * as userQueries from '../../prisma/queries/user';
import * as render from './render';

export const edit = [
  usernameValidation,
  body('password')
    .trim()
    .custom(async (value) => {
      if (value.length > 0 && value.length < 8)
        throw new Error('New password must be 8 or more characters long.');
    })
    .escape(),
  body('confirmPassword')
    .trim()
    .custom(async (value, { req }) => {
      if (req.body.password !== '' && value.length === 0)
        throw new Error('Please confirm your new password.');
    })
    .bail()
    .custom(async (value, { req }) => {
      if (value !== req.body.password)
        throw new Error('Both passwords do not match.');
    })
    .escape(),
  body('currentPassword')
    .trim()
    .custom(async (value, { req }) => {
      if (req.body.password !== '') {
        if (value.length === 0)
          throw new Error(
            'Please enter your current password in order to change it.'
          );
        const match = await userQueries.comparePassword({
          userData: req.user,
          password: value,
        });
        if (!match) throw new Error('Incorrect password.');
      }
    })
    .escape(),
  validate,
  asyncHandler(async (req, res, next) => {
    if (!req.user) {
      req.flash(
        'warning',
        'You must be logged in to edit your account details.'
      );
      return res.redirect('/login');
    }
    if (req.formErrors) return render.account(req, res, next);
    await userQueries.update({ userData: req.user, body: req.body });
    req.flash('success', 'Your account details have been saved.');
    return res.redirect('/account');
  }),
];
