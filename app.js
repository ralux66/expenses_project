var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require('cors')
//var indexRouter = require("./routes/index");
//var usersRouter = require("./routes/users");
var mailRouter = require("./routes/mail.router.js");
var expenseRouter = require("./routes/expense.router.js");
var app = express();
var morgan = require("morgan");
var sequelize = require("./db/managentdb.js");

// view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use("/", indexRouter);
//app.use("/users", usersRouter);
app.use("/api", mailRouter);
app.use("/expense",expenseRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(morgan("dev"));
// error handler
app.use(async function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  await sequelize.sync({ force: true });
});

module.exports = app;
