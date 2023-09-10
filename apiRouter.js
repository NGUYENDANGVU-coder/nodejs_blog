const express = require("express");
const AccountsModel = require("./models/accounts");
const router = express.Router();
const PAGE_SIZE = 2;
router.get("/", (req, res) => {
  res.json("hihii");
});
//Phan trang
router.get("/v1/user", (req, res, next) => {
  var page = req.query.page;
  if (page) {
    //get page
    page = parseInt(page);
    if (page < 1) {
      page = 1;
    }
    const skip = (page - 1) * PAGE_SIZE;
    AccountsModel.find({})
      .skip(skip)
      .limit(PAGE_SIZE)
      .then((data) => {
        AccountsModel.countDocuments({}).then((total) => {
          console.log(total);
          return res.json({
            page: page,
            total_pages: Math.ceil(total / PAGE_SIZE),
            data: data,
          });
        });
      })
      .catch((err) => res.status(500).json("Loi server"));
  } else {
    //get all
    AccountsModel.find({})
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json("Loi server"));
  }
});
router.get("/about", (req, res) => {
  res.json("About");
});
router.get("/:id", (req, res) => {
  res.json("test" + req.params.id);
});
router.post("/", (req, res) => {
  console.log("kq"+req.headers.vu);
  res.json("test post");
});
module.exports = router;
