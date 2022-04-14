const express = require("express")
const router = express.Router()
const db = require("./userQueries")

router.get("/getall", db.getAllUsers)
router.get("/getbyid/:id", db.getUserById)
router.get("/getbyusername/:username", db.getUserByUsername)
router.post("/signup", db.createUser)
router.delete("/delete/:id", db.deleteUser)


module.exports = router