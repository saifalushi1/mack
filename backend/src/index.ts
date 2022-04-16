import express, {Request, Response} from 'express';
const db = require("./controllers/userQueries")
// const express = require("express")
// import {Request, Response} from 'express';


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const userController = require("./controllers/userController")
app.use("/user", userController)

const messageController = require("./controllers/messageController")
app.use("/message", messageController)

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});

