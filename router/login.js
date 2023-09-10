const express = require("express");
const AccountsModel = require("../models/accounts");
const path = require("path");
var jwt = require("jsonwebtoken");

const loginRouter = express.Router();
//LOGIN
loginRouter.get("/login", (req, res) => {
  const duongdanFile = path.join(__dirname, "../login.html");
  res.sendFile(duongdanFile);
});
loginRouter.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  AccountsModel.findOne({
    username: username,
    password: password,
  })
    .then((data) => {
      if (data) {
        var token = jwt.sign({ _id: data._id }, "mk");
        res.json({
          message: "Đăng nhập thành công",
          token: token,
        });
      } else {
        res.status(400).json({
          error: "Tài khoản không tồn tại",
        });
      }
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        error: "Lỗi máy chủ",
      });
    });
});
const checkLogin = (req, res, next) => {
  //check login
  var token = req.cookies.token;
  try {
    var data = jwt.verify(token, "mk");
    if (data) {
      AccountsModel.findOne({
        _id: data._id,
      })
        .then((data) => {
          if (data) {
            req.data = data;
            next();
          } else {
            res.json("Khong co phep");
          }
        })
        .catch((err) => res.status(500).json("Loi server"));
    }
  } catch (error) {
    return res.status(500).json("Loi token ko hop le");
  }
};
const checkStudent = (req, res, next) => {
  if (
    req.data.role === "student" ||
    req.data.role === "teacher" ||
    req.data.role === "manager"
  ) {
    next();
  } else {
    res.status(500).json("Khong co phep");
  }
};
loginRouter.get("/task", checkLogin, checkStudent, (req, res, next) => {
  // console.log(req.data);
  res.json("ALL Task");
});
loginRouter.get("/student", checkLogin, (req, res, next) => {
  res.json("Student");
});
//Dang nhap lan 2 tro len
loginRouter.get(
  "/private",
  (req, res, next) => {
    try {
      var token = req.cookies.token;
      console.log(token);
      var data = jwt.verify(token, "mk");
      if (data) {
        next();
      }
    } catch (error) {
      return res.redirect("/login");
    }
  },
  (req, res, next) => {
    res.json("welcome");
  }
);
module.exports = loginRouter;
