const express = require("express");
const app = express();
require("./app/database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/"));

const ProductRouter = require("./app/Product/router");

app.get("/", (req, res) => res.json({ message: "hello world" }));
app.use("/api", ProductRouter);
app.get("/categories", (req, res) => res.json({ message: "categories route" }));

// app.use((req, res, next) => {
//   res.json({ message: "route not exist" });
// });

app.use((error, req, res, next) => {
  const isValidationError = error._message;
  if (isValidationError) {
    let errorFields = {};
    Object.keys(error.errors).forEach(
      (key) =>
        (errorFields = {
          ...errorFields,
          [key]: String(error.errors[key].message).toLowerCase(),
        })
    );
    return res.status(401).json({
      fields: errorFields,
      message: String(error._message).toLowerCase(),
    });
  }
  console.log(error);
  return res.status(500).json({
    meessage: String(error.message ?? "Internal server error").toLowerCase(),
  });
});

app.listen(4000, () => console.log("server running"));
