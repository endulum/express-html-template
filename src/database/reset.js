#! /usr/bin/env node
require('dotenv').config()

const TABLES = ['users', 'session']

const fs = require('fs')
const path = require('path')
const sql = fs.readFileSync(path.resolve(__dirname, 'starter-data.sql')).toString()

const { Client } = require('pg')
async function main() {
  console.log('connecting...')
  const client = new Client({ connectionString: process.env.CONNECTION })
  await client.connect()

  // console.log('dropping existing tables...')
  // await Promise.all(TABLES.map(async (tableName) => {
  //   const { rows } = await client.query(`
  //     SELECT EXISTS (
  //       SELECT 1
  //       FROM information_schema.tables
  //       WHERE table_name = '${tableName}'
  //     ) AS exists;
  //   `)
  //   if (rows[0].exists) await client.query(`DROP TABLE ${tableName}`)
  // }))

  console.log('making new tables...')
  await client.query(sql)

  await client.end()
  console.log('done!')
}

main().catch(e => console.error(e))