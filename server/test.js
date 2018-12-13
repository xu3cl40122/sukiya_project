
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(5);
var hash = bcrypt.hashSync("777", salt)
console.log(hash.length)

console.log(bcrypt.compareSync("B4c0/\/", hash)) // true
console.log(bcrypt.compareSync("not_bacon", hash)); // false