const pgp = require('pg-promise')(/* options */)
// const db = pgp(`postgres://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.port}/${process.env.database}`)
const db = pgp('postgres://postgres:rootuser@localhost:5432/mack')
import { Request, Response } from "express"
require('dotenv').config()

const getAllUsers = async (req: Request, res: Response) => {
    try{
        const users = await db.any("SELECT * FROM users")
        res.status(200).json(users)
    } catch(err) {
        throw err
    }
}

const getUserById = async (req: Request, res: Response) => {
    try{
        const userById = await db.one("SELECT * FROM users WHERE user_id = $1", [req.params.id])
        res.status(200).json(userById)
    } catch(err){
        throw err
    }
}

const getUserByUsername = async (req: Request, res: Response) => {
    try{
        const userByUsername = await db.any("SELECT user_id, username, email FROM users WHERE username LIKE $1", [`${req.params.username}%`])
        res.status(200).json(userByUsername)
    } catch(err) {
        throw err
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername
}