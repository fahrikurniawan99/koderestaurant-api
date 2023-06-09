const express = require("express");
const app = express();
require("./database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/"));

const ProductRouter = require("./app/Product/router");

app.get("/", (req, res) => res.json({ message: "hello world" }));
app.use("/api", ProductRouter);
app.get("/categories", (req, res) => res.json({ message: "categories route" }));

app.listen(4000, () => console.log("server running"));
