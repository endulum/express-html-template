import asyncHandler from 'express-async-handler';
import passport from 'passport';
import { parse } from 'querystring';
import { ofetch } from 'ofetch';

// import * as userQueries from '../../prisma/queries/user';

// const exchangeCodeForToken = async (code: string) => {
//   const { access_token } = await ofetch(
//     'https://github.com/login/oauth/access_token',
//     {
//       method: 'get',
//       params: {
//         client_id: process.env.GH_CLIENT_ID,
//         client_secret: process.env.GH_SECRET,
//         redirect_uri: `${process.env.FRONTEND_URL}/github`,
//         code,
//       },
//       parseResponse: (response) => parse(response),
//     }
//   );
//   return access_token;
// };

// const fetchGithubUser = async (accessToken: string) => {
//   const data = await ofetch('https://api.github.com/user', {
//     method: 'get',
//     headers: {
//       Authorization: `token ${accessToken}`,
//     },
//   });
//   return data;
// };

export const github = asyncHandler(async (req, res, next) => {
  const { code } = req.query as Record<string, string | null>;
  if (!code || code === 'undefined') {
    res.status(400).send('No code is provided.');
    return;
  }
  passport.authenticate('github', (err: Error, user: Express.User) => {
    if (err) return next(err);
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/');
    });
    // if (!user) {
    //   req.formErrors = { username: 'Incorrect username or password.' };
    //   return render.login(req, res, next);
    // } else
    // req.logIn(user, (err) => {
    //   if (err) return next(err);
    //   return res.redirect('/');
    // });
  })(req, res, next);
  // const accessToken = await exchangeCodeForToken(code);
  // const githubUser = await fetchGithubUser(accessToken);

  // okay... what next?
});
