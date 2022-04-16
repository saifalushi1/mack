const messagedb = require("./messageQueries")
import express from "express"
const router = express.Router()

router.post("/create", messagedb.sendMessage)


module.exports = router