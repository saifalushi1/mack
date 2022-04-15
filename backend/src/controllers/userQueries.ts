const pgp = require('pg-promise')(/* options */)
require('dotenv').config()
const db = pgp(process.env.DBSTRING)
const bcrypt = require('bcrypt')
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
        //When using like and passing special characters such as % you must use this format EXAMPLE:\'%$1#%\'
        //When passing a variable the library expects a string. So if it needs to be dynamic use `${}`
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
            password: await bcrypt.hash(req.body.password, 10),
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

const login = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userinfo = await db.one("SELECT password FROM users WHERE email = $1", [req.body.email]) 
        const match = await bcrypt.compare(req.body.password, userinfo.password);
        res.status(200).json({
            "match": match,
            "userinfo": userinfo
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
    login,
}