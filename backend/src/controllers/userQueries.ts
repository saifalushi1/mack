const pgp = require('pg-promise')(/* options */)
require('dotenv').config()
const db = pgp(process.env.DBSTRING)

import { Request, Response, NextFunction } from "express"


const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const users = await db.any("SELECT * FROM users")
        res.status(200).json(users)
    } catch(err) {
        next(err)
    }
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userById = await db.one("SELECT * FROM users WHERE id = $1", [req.params.id])
        console.log(userById)
        res.status(200).json(userById)
    } catch(err){
        console.log(err)
        next(err)
    }
}

const getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // const userByUsername = await db.any("SELECT * FROM users WHERE username LIKE $1", [`${req.params.username}`])
        const userByUsername = await db.any('SELECT * FROM users WHERE username LIKE \'$1#%\'', `${req.params.username}`)
        console.log(userByUsername)
        res.status(200).json(userByUsername)
    } catch(err){
        console.log(err)    
        next(err)
    }
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const createdUser = await db.result("INSERT INTO users (id, username, password, email, first_name, last_name, created_on, is_active) VALUES(DEFAULT, $<username>, $<password>, $<email>, $<name.first>, $<name.last>, current_timestamp, 0) RETURNING id", 
        {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: {first: req.body.firstname, last: req.body.lastname}, 
        }
        )
        res.status(200).json(createdUser.rows)
    } catch(err){
        console.log(err)
        next(err)   
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
    const deletedUser = await db.result("DELETE FROM users WHERE id = $1", [req.params.id])
    res.status(200).json({
        "deltedUsers": deletedUser.rowCount,
        "message": "succesfully deleted user"
    })
    } catch(err){
        next(err)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    deleteUser,
}