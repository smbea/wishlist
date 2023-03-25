import { Pool } from 'pg'
import { Request, Response } from 'express'
import fs from 'fs'

let pool: Pool

export const connectToDb = () => {
  pool = new Pool({
    database: 'postgres',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    host: 'localhost'
  })

  pool.on('error', err => {
    console.error('Unexpected error on idle client', err)
  })

  const seedQuery = fs.readFileSync('./db/seed.sql', { encoding: 'utf8' })
  pool.query(seedQuery, (err, res) => {
    console.log(err, res)
    console.log('Seeding Completed!')
    pool.end()
  })
}