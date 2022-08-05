import dotenv from "dotenv";
dotenv.config();
import pgPromise from "pg-promise";
const pgp = pgPromise({});
const db = pgp(process.env.DBSTRING!);

export default db;
