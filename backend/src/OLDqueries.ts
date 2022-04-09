const {Client} = require("pg")
require('dotenv').config()
import { Request, Response} from "express"

const client = new Client({
    host: process.env.host,
    user: process.env.user,
    port: process.env.port,
    password: process.env.password,
    database: process.env.database
})

            
const getUsers = (req: Request, res: Response) => {
    client.connect()
    client.query("SELECT * FROM users ORDER BY user_id ASC", (error: any, results: { rows: any }) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
        client.end
    })
}

const getUserById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    client.connect()
    client.query("SELECT * FROM users WHERE user_id = $1", [id], (error: any, results: {rows: any}) => {
        if(error){
            throw error
        }
        res.status(200).json(results.rows)
        client.end
    })
}




module.exports = {
    getUsers
}