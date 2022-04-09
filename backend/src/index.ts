import express, {Request, Response} from 'express';
const db = require("./queries")
// const express = require("express")
// import {Request, Response} from 'express';


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/getusers", db.getAllUsers)
app.get("/getuserbyid/:id", db.getUserById)
app.get("getuserbyusername/:username", db.getUserByUsername)

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});

