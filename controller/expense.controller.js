const QueuePayement = require("../Model/QueuePayement.js");

async function getExpense(req, res) {
  let expense;
  //console.log(req.params.from);
  switch (req.params.from) {
    case "promerica":
      expense = await QueuePayement.findOne({
        where: { From: "notificaciones@promerica.com.sv" },
        order: [["Date", "DESC"]],
      });
      break;
    case "all":
      expense = await QueuePayement.findAll({
        order: [["Date", "DESC"]],
      });
      break;
    default:
      expense = await QueuePayement.findAll({
        order: [["Date", "DESC"]],
      });
      break;
  }

  res.send(expense);
  //res.json(expense.data);
}

module.exports = {
  getExpense,
};
