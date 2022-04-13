import express, {Request, Response} from 'express';
const db = require("./queries")
const dbt = require("./OLDqueries")
// const express = require("express")
// import {Request, Response} from 'express';


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/getusers", db.getAllUsers)
app.get("/getuserbyid/:id", db.getUserById)
app.get("getuserbyusername/:username", db.getUserByUsername)
app.get("/testusername/:username", dbt.getUserByUsernameTwo)
app.post("/createuser", db.createUser)
app.delete("/deleteuser/:id", db.deleteUser)

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});

