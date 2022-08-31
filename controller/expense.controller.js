const QueuePayement = require("../Model/QueuePayement.js");

async function getExpense(req, res) {
  let expense;
  //console.log(req.params.from);
   switch (req.params.from) {
    case "promerica":
      expense = await QueuePayement.findOne({
        where: { From: "notificaciones@promerica.com.sv" },
      });
      break;
    case "all":
      expense = await QueuePayement.findAll();
      break;
    default:
      expense = await QueuePayement.findAll();
      break;      
  } 

  res.send(expense);
  //res.json(expense.data);
}

module.exports = {
  getExpense
};
