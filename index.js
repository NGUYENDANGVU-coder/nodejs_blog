const express = require("express");
const morgan = require("morgan");
const router = require("./apiRouter.js");
const path = require("path");
var cookieParser = require('cookie-parser')
const app = express();
const port = 3000;
const accountRouter = require("./router/accounts.js");
const loginRouter = require("./router/login.js");

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({
  extends:true
}));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use(cookieParser())
//CORS
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});


app.use("/api/account/", accountRouter);
app.use("/api/", router);
app.use("/", loginRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
