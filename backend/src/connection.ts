require("dotenv").config();
const pgp = require("pg-promise")(/* options */);
const db = pgp(process.env.DBSTRING);

module.exports = db;
