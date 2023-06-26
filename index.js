const express = require("express");
const app = express();
require("./app/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.static("public/"));

const ProductRouter = require("./app/Product/router");
const CategoryRouter = require("./app/Category/router");
const TagRouter = require("./app/Tag/router");
const AuthRouter = require("./app/Auth/router");
const CartRouter = require("./app/Cart/router");
const OrderRouter = require("./app/Order/router");
const InvoiceRouter = require("./app/Invoice/router");
const errorHandler = require("./app/middlewares/errorHandler");

app.get("/", (req, res) => res.json({ message: "hello world" }));
app.use("/api", ProductRouter);
app.use("/api", CategoryRouter);
app.use("/api", TagRouter);
app.use("/api", CartRouter);
app.use("/api", OrderRouter);
app.use("/api", InvoiceRouter);

app.use("/api/auth", AuthRouter);

app.use(errorHandler);

app.listen(process.env.PORT || 4000, () => console.log("server running"));
