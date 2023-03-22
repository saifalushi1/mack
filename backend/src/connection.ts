import dotenv from "dotenv";
dotenv.config();
import pgPromise from "pg-promise";

export default function () {
    const pgp = pgPromise({});
    const db = pgp(process.env.DBSTRING!);
    return db;
}
