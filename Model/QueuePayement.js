var sequelize = require("../db/managentdb.js");
var { DataTypes } = require("sequelize");

const queuePayment = sequelize.define("queuePayments", {
  IdMail: {
    type: DataTypes.TEXT,
    allowNull: false,
    primaryKey: true,
  },
  Threadid: {
    type: DataTypes.TEXT,
    allowNull: false,
    primaryKey: false,
  },
  Snippet: DataTypes.TEXT,
  From: DataTypes.TEXT,
  To: DataTypes.TEXT,
  Subject: DataTypes.TEXT,
  ProcessedAmount: DataTypes.DECIMAL(10, 2),
  Date: DataTypes.DATEONLY,
});

/*   (async () => {
    await sequelize.sync({ force: true });
    queuePayment.create({
      IdMail: data.id,
      Threadid: data.threadId,
      Snippet: data.snippet,
      From: data.payload.headers.filter((x) => x.name == "From").value,
      To: data.payload.headers.filter((x) => x.name == "To").value,
      Subject: data.payload.headers.filter((x) => x.name == "Subject").value,
      Date: Date.now(),
    });
  })(); */
module.exports = queuePayment;
