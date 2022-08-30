import db from "../../connection";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const users = await db.any("SELECT * FROM users");
        const cookie = req.headers.cookie;
        return res.json({ users: users, cookie: cookie });
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    try {
        const userById = await db.one("SELECT * FROM users WHERE id = $1", [id]);
        return res.json(userById);
    } catch (err) {
        next(err);
    }
};

const getUserByUsername = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { username } = req.params;
    try {
        //When using like and passing special characters such as % you must use this format EXAMPLE: \'%$1#%\'
        //When passing a variable the library expects a string. So if it needs to be dynamic use `${}`
        const userByUsername = await db.any(
            "SELECT * FROM users WHERE username LIKE '$1#%'",
            `${username}`
        );
        return res.json(userByUsername);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { firstName, lastName, username, email, password } = req.body;
    if (!firstName || !lastName || !username || !email || !password) {
        return res.status(400).json({ error: "Missing field" });
    }
    try {
        const isUsernameTaken = await db.result("SELECT * FROM users WHERE username = $1", [
            username
        ]);
        const isEmailTaken = await db.result("SELECT * FROM users WHERE email = $1", [email]);

        if (isUsernameTaken.rowCount > 0) {
            return res.status(409).json({ error: "Username already taken" });
        }
        if (isEmailTaken.rowCount > 0) {
            return res.status(409).json({ error: "Email already taken" });
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
        return res.json({ createdUser: createdUser.rows });
    } catch (err) {
        console.error(err);
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
    if (!email || !password) {
        return res.status(400).json({ error: "Must provide email and password" });
    }
    try {
        const doesUserExist = await db.result("SELECT * FROM users WHERE email = $1", [email]);

        if (doesUserExist.rowCount === 0) {
            return res.status(404).json({ error: "No account found" });
        }

        const userinfo = await db.one("SELECT * FROM users WHERE email = $1", [email]);
        const match = await bcrypt.compare(password, userinfo.password);

        if (!match) {
            return res.status(401).json({ error: "Incorrect email or password" });
        }

        await db.none("UPDATE users SET is_active = 1 WHERE id = $1", [userinfo.id]);

        const token = jwt.sign(
            { id: userinfo.id, username: userinfo.username },
            process.env.SECRET!
        );

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        }).json({
            match: match,
            userinfo: {
                id: userinfo.id,
                username: userinfo.username,
                email: userinfo.email,
                firstName: userinfo.first_name,
                lastName: userinfo.last_name
            }
        });
    } catch (err) {
        next(err);
    }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await db.none("UPDATE users SET is_active = 0 WHERE id = $1", [req.body.id]);
        return res
            .clearCookie("access_token")
            .status(200)
            .json({ message: "Successfully logged out" });
    } catch (err) {
        next(err);
    }
};

export { db, getAllUsers, getUserById, getUserByUsername, createUser, deleteUser, login, logout };
