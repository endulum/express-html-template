# HTML Server Template

- **Lang:** TypeScript + Express.js Framework
- **Database:** Postgresql + Prisma ORM
- **Protection method:** Passport.js + sessions
- **Templating engine:** EJS

## Todo

- Add a testing suite (Vitest)
- Browse and implement Express.js best practices:
  - [Security](https://expressjs.com/en/advanced/best-practice-security.html)
  - [Performance](https://expressjs.com/en/advanced/best-practice-performance.html#cache-request-results)
- Add prettier config
- Add utility css file under `public`

## Installation

Navigate to the root directory where you'd like your new project to be, and initialize a repo using this template:

```sh
gh repo create my-project --template endulum/express-html-template --public
```

Install all required packages:

```sh
npm install
```

### Environment

This project uses three env files: `test`, `development`, and `production`. The repo supplies a file `.env.example` with the variables necessary for the project to run. Copy this file to the three envs described. A handy script for this is provided for you:

```sh
npm run initenv
# cp -n .env.example .env.production && cp -n .env.example .env.development && cp -n .env.example .env.test
```

For development, at minimum you need:

- `DATABASE_URL`
- `SESSION_SECRET` for authentication sessions to work.
  Following that, you should be ready to `npm run dev`.
