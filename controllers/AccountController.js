const AccountsModel = require("../models/accounts");

const findAccount = (req,res) => {
    AccountsModel.find({})
    .then(data=>res.json(data))
    .catch(err=>res.status(500).json("Loi server"))
};
module.exports = {
  findAccount,
};
