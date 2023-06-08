const express = require("express");
const logger = require("morgan");
const path = require("path");
const createError = require("http-errors");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

const db = require("./database");
const ProductRoute = require("./app/product/route");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors("*"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", ProductRoute);

app.use((req, res, next) => {
  next(createError.NotFound("route not found"));
});

app.use((error, req, res, next) => {
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};
  console.log(error);
  return res.send(error);
});

db.on("open", () => {
  console.log(`database connection success`);
});
app.listen(PORT, () => {
  console.log(`server was listening in port ${PORT}`);
});

module.exports = app;
