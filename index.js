const express = require("express");
const app = express();

app.get("/", (req, res) => res.json({ message: "hello world" }));
app.get("/products", (req, res) => res.json({ message: "pruducts route" }));

app.listen(4000, () => console.log("server running"));
