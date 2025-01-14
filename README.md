# HTML Server Template

- **Lang:** TypeScript + Express.js Framework
- **Database:** Postgresql + Prisma ORM
- **Protection method:** Passport.js + sessions
- **Templating engine:** EJS
- **Testing:** Vitest

## Todo

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

### Testing

This project uses Docker to provide an independent Postgres database for testing. For your `.env.test`, make sure the database URL points to that database:

```
DATABASE_URL=postgresql://prisma:prisma@localhost:5433/tests
```

The script `npm run test` handles bringing up the container, applying any migrations present, and running the tests.

### Github App

This template lets users authenticate using their GitHub accounts. This project can be run without the necessary env vars for a GitHub app, but the `/github` route will not be functional. You'll need a [GitHub app](https://github.com/settings/apps) of your own to fill in the missing vars and have this functionality complete.
