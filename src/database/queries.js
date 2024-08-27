const pool = require('./pool')

class DatabaseError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode || 500
    this.name = 'DatabaseError'
  }
}

async function queryWithCatch(...args) {
  return pool.query(...args)
    .catch(e => {
      console.error(e)
      throw new DatabaseError(
        e.code === 'ECONNREFUSED' ?
          'The database cannot be accessed at this time.' :
          'Something went wrong when accessing the database.'
      )
    })
}

const queries = {}

queries.getAllUsers = async function() {
  const { rows } = await queryWithCatch('SELECT id, username FROM users;')
  return rows
}

queries.getUserByUsername = async function(username) {
  const { rows } = await queryWithCatch(`
    SELECT * FROM users WHERE username = $1;
  `, [username])
  return rows[0]
}

queries.getUserById = async function(id) {
  const { rows } = await queryWithCatch(`
    SELECT * FROM users WHERE id = $1;
  `, [id])
  return rows[0]
}

queries.addUser = async function(username, password) {
  await queryWithCatch(`
    INSERT INTO users (username, password) VALUES ($1, $2);
  `, [username, password])
}

queries.updateUser = async function(id, details) {
  if (details.password) {
    await queryWithCatch(`
      UPDATE users SET username = $1, password = $2 WHERE id = $3
    `, [details.username, details.password, id])
  } else {
    await queryWithCatch(`
      UPDATE users SET username = $1 WHERE id = $2
    `, [details.username, id])
  }
}

module.exports = queries