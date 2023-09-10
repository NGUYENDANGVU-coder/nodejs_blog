const express = require("express");
const router = express.Router();

const AccountsModel = require("../models/accounts");
const { findAccount } = require("../controllers/AccountController");
router.get("/", (req, res, next) => {
  AccountsModel.find({})
    .then((data) => console.log(data))
    .catch((err) => res.json(err));
});
router.post("/", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  AccountsModel.findOne({
    username: username,
  })
    .then((data) => {
      if (data) {
        res.json("User da ton tai");
      } else {
        return AccountsModel.create({
          username: username,
          password: password,
        });
      }
    })
    .then((data) => res.json("tao tai khoan thanh cong"))
    .catch((err) => res.status(500).json("Tao tai khoan that bai"));
});
router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const newPassword = req.body.newPassword;
  AccountsModel.findByIdAndUpdate(id, {
    password: newPassword,
  })
    .then((data) => res.json("update done"))
    .catch((err) => res.status(500).json("Loi"));
});
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  AccountsModel.deleteOne({
    _id: id,
  })
    .then((data) => res.json("delete done"))
    .catch((err) => res.status(500).json("Loi"));
});
router.get("/test",findAccount)
module.exports = router;
