const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test_DV");
const Schema = mongoose.Schema;

const AccountsSchema = new Schema(
  {
    username: String,
    password: String,
    role: String,
  },
  {
    collection: "accounts",
  }
);
const AccountsModel = mongoose.model("accounts", AccountsSchema);
// for (let index = 0; index < 10; index++) {
//     AccountsModel.create({
//         username: 'DV'+index,
//         password: '123123'
//     })
// }
module.exports = AccountsModel;
