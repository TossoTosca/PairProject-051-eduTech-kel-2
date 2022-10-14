const bcrypt = require('bcryptjs');
const formatPass = (password) => {
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

// console.log(formatPass("test"))
module.exports = formatPass;