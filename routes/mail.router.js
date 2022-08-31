const express = require('express');
const controllersmail=require('../controller/mail.controller.js');
const router = express.Router();

router.get('/mail/user/:email',controllersmail.getUser)
router.get('/mail/send',controllersmail.sendMail);
router.get('/mail/drafts/:email', controllersmail.getDrafts);
router.get('/mail/read/:messageId', controllersmail.readMail);
router.get('/mail/message/:email',controllersmail.getMessageMail);
router.get('/mail/Labels/:email',controllersmail.getLabels);
router.get('/mail/messageinsert/:email',controllersmail.getMessageMailInsert);

module.exports = router;