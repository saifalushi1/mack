require('dotenv').config()
const pgp = require('pg-promise')
const db = pgp(process.env.DBSTRING)

module.exports = db