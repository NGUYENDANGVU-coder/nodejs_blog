var jwt = require('jsonwebtoken');
var data ={
    username:"DangVuhihi"
}
// var token = jwt.sign({ data }, '1231233',{
//     expiresIn: 300
// });
var jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiRGFuZ1Z1aGloaSJ9LCJpYXQiOjE2OTM4ODkxMTcsImV4cCI6MTY5Mzg4OTQxN30.CazHpSdXixVUJtGHOzxA1eMoGUlavDVfYmi9_bo-Akk';
const kqua =  jwt.verify(jwtToken,'1231233')
console.log(kqua);
// console.log(token);