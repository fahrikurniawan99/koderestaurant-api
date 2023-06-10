const express = require("express");
const app = express();
require("./app/database");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public/"));

const ProductRouter = require("./app/Product/router");
const CategoryRouter = require("./app/Category/router");
const TagRouter = require("./app/Tag/router");

app.get("/", (req, res) => res.json({ message: "hello world" }));
app.use("/api", ProductRouter);
app.use("/api", CategoryRouter);
app.use("/api", TagRouter);

// app.use((req, res, next) => {
//   res.json({ message: "route not exist" });
// });

app.use((error, req, res, next) => {
  if (error.name === "ValidationError") {
    let errorFields = {};
    Object.keys(error.errors).forEach(
      (key) =>
        (errorFields = {
          ...errorFields,
          [key]: String(error.errors[key].message).toLowerCase(),
        })
    );
    return res.status(400).json({
      message: errorFields,
      error,
    });
  }
  if (error.name === "CastError") {
    return res.status(error.statusCode).json({
      message: "silahkan masukan id yang valid",
      error,
    });
  }
  return res.status(error.statusCode ?? 500).json({
    meessage: String(error.message ?? "Internal server error").toLowerCase(),
    error,
  });
});

app.listen(4000, () => console.log("server running"));
