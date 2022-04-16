const db = require("../connection")
require('dotenv').config()
import { Request, Response, NextFunction } from "express"

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const message = await db.one("INSERT INTO messages (id, parent_message_id, message_body, created_on, creator_id) VALUES (DEFAULT, $<parent>, $<message>, current_timestamp, $<creator>) RETURNING id", 
        {
            parent: req.body.parent,
            message: req.body.message,
            creator: req.body.creator
        })
        const recipient = await db.result("INSERT INTO message_recipient (id, recipient_group_id, recipient_id, message_id) VALUES (DEFAULT, NULL, $<recipient>, $<message_id>)", 
        {
            recipient: req.body.recipient,
            message_id: message.id
        })
        res.status(200).json({
            message,
            "success": true
        })
    } catch(err) {
        next(err)
    }
}

module.exports = {
    sendMessage
}