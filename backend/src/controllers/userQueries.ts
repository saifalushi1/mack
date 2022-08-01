const db = require("../connection");
import { Request, Response, NextFunction } from "express";
const bcrypt = require("bcrypt");

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await db.any("SELECT * FROM users");
        res.json(users);
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const userById = await db.one("SELECT * FROM users WHERE id = $1", [id]);
        res.json(userById);
    } catch (err) {
        next(err);
    }
};

const getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;
    try {
        //When using like and passing special characters such as % you must use this format EXAMPLE:\'%$1#%\'
        //When passing a variable the library expects a string. So if it needs to be dynamic use `${}`
        const userByUsername = await db.any(
            "SELECT * FROM users WHERE username LIKE '$1#%'",
            `${username}`
        );
        res.json(userByUsername);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, username, email, password } = req.body;
    console.log("*************", firstName + " ************");
    try {
        const isUsernameTaken = await db.result("SELECT * FROM users WHERE username = $1", [
            username
        ]);
        const isEmailTaken = await db.result("SELECT * FROM users WHERE email = $1", [email]);

        if (isUsernameTaken.rowCount > 0) {
            res.status(409).json({ error: "Username already taken" });
        }
        if (isEmailTaken.rowCount > 0) {
            res.status(409).json({ error: "Email already taken" });
        }

        const createdUser = await db.result(
            "INSERT INTO users (id, username, password, email, first_name, last_name, created_on, is_active) VALUES(DEFAULT, $<username>, $<password>, $<email>, $<name.first>, $<name.last>, current_timestamp, 0) RETURNING id",
            {
                username: username,
                password: await bcrypt.hash(password, 10),
                email: email,
                name: { first: firstName, last: lastName }
            }
        );
        res.json({ createdUser: createdUser.rows });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedUser = await db.result("DELETE FROM users WHERE id = $1", [req.params.id]);
        res.json({
            deltedUsers: deletedUser.rowCount,
            message: "succesfully deleted user"
        });
    } catch (err) {
        next(err);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const userinfo = await db.one("SELECT password FROM users WHERE email = $1", [email]);
        const match = await bcrypt.compare(password, userinfo.password);
        if (match) {
            res.json({
                match: match,
                userinfo: userinfo
            });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    db,
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    deleteUser,
    login
};
