import pool from "./pool";

class DatabaseError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode || 500
    this.name = 'DatabaseError'
  }
}

async function queryWithCatch(sql: string, values?: any[]) {
  return pool.query(sql, values)
    .catch((e: Error) => {
      console.log(sql, values)
      console.error(e)
      throw new DatabaseError(
        'code' in e && e.code === 'ECONNREFUSED' ?
          'The database cannot be accessed at this time.' :
          'Something went wrong when accessing the database.',
        500
      )
    })
}

const queries: Record<string, (...args: any) => Promise<any>> = {}

queries.getAllUsers = async function() {
  const { rows } = await queryWithCatch('SELECT id, username FROM users;')
  return rows
}

queries.getUserByUsername = async function(username: string) {
  const { rows } = await queryWithCatch(`
    SELECT * FROM users WHERE username = $1;
  `, [username])
  return rows[0]
}

queries.getUserById = async function(id: number) {
  const { rows } = await queryWithCatch(`
    SELECT * FROM users WHERE id = $1;
  `, [id])
  return rows[0]
}

queries.addUser = async function(username: string, password: string) {
  await queryWithCatch(`
    INSERT INTO users (username, password) VALUES ($1, $2);
  `, [username, password])
}

queries.updateUser = async function(id: number, details: Record<string, any>) {
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

export default queries