const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test_DV");
const Schema = mongoose.Schema;

const accounts = new Schema(
  {
    name: String,
    password: String,
    age: Number,
    salary: String,
    coursesId: {
      type: String,
      ref: "courses",
    },
  },
  {
    collection: "accounts",
  }
);
const courses = new Schema(
  {
    name: String,
    teacher: String,
    lesson: [],
    price: Number,
  },
  {
    collection: "courses",
  }
);
const AccountsModel = mongoose.model("accounts", accounts);
// AccountsModel.find({})
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));
// AccountsModel.create({
//   name: 'vu123',
//   age:22,
//   password:"123123",
//   salary:'1000VND'
// },{
//   name: 'vu1234',
//   age:22,
//   password:"tttt",
//   salary:'17000VND'
// },{
//   name: 'vu12345',
//   age:22,
//   password:"hh",
//   salary:'11000VND'
// },{
//   name: 'vu123456',
//   age:22,
//   password:"123123",
//   salary:'15000VND'
// })
// .then((data)=>
//   console.log(data)
// )
// .catch((err)=>{
//   console.log(err);
// })

const CourseModel = mongoose.model("courses", courses);
AccountsModel.find({
  name: "vu123",
})
.populate("coursesId")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
