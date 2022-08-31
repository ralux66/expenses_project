const { Sequelize } = require("sequelize");
//require('dotenv/config');

/* const sequelize = new Sequelize('postgres://:localhost:5432/managentpayment') // Example for postgres
 */

const sequelize = new Sequelize(
    "managentpayment", // db name,
    "postgres", // username
    "ragu77", // password
    {
      host: "localhost",
      dialect: "postgres",
      // pool: {
      //   max: 5,
      //   min: 0,
      //   require: 30000,
      //   idle: 10000,
      // },
      // logging: false,
    }
  );

module.exports = sequelize;