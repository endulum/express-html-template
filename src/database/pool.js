require('dotenv').config()
const { Pool } = require("pg")
module.exports = new Pool({
  connectionString: process.env.CONNECTION
})

// connection string format for local psql databases:
// postgresql://<role_name>:<role_password>@localhost:5432/<database_name>