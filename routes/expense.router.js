const express = require('express');
const expensecontroller=require('../controller/expense.controller.js');

const router = express.Router();

router.get('/getexpense/:from',expensecontroller.getExpense);

module.exports = router;