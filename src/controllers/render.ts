import asyncHandler from 'express-async-handler';

export const notFound = asyncHandler(async (_req, res) => {
  return res.status(404).render('layout', {
    page: 'error',
    title: 'Not Found',
    message: "The page you're looking for could not be found.",
  });
});

export const rateLimit = asyncHandler(async (_req, res) => {
  return res.status(404).render('layout', {
    page: 'error',
    title: 'Too Many Requests',
    message: "You're making too many requests too fast. Try again later.",
  });
});

export const noCode = asyncHandler(async (_req, res) => {
  return res.status(400).render('layout', {
    page: 'error',
    title: 'No Code',
    message: 'No code was provided for GitHub authentication.',
  });
});

export const account = asyncHandler(async (req, res) => {
  if (!req.user) {
    req.flash('warning', 'You must be logged in to edit your account details.');
    return res.redirect('/login');
  }
  return res.status(req.formErrors ? 400 : 200).render('layout', {
    page: 'forms/update-account',
    title: 'Account Settings',
    prevForm: {
      ...req.body,
      username: 'username' in req.body ? req.body.username : req.user.username,
    },
    formErrors: req.formErrors,
  });
});

export const login = asyncHandler(async (req, res) => {
  const loginUsernamePrefill = req.flash('loginUsernamePrefill');
  return res.render('layout', {
    page: 'login',
    title: 'Log In',
    prevForm: {
      ...req.body,
      username:
        loginUsernamePrefill.length > 0
          ? loginUsernamePrefill
          : req.body.username,
    },
    formErrors: req.formErrors,
  });
});

export const signup = asyncHandler(async (req, res) => {
  return res.render('layout', {
    page: 'signup',
    title: 'Sign Up',
    prevForm: req.body,
    formErrors: req.formErrors,
  });
});
