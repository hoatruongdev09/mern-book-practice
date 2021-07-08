const bcrypt = require('bcrypt')

const saltRound = 10

const generatePassword = async (password) => {
    return await bcrypt.hash(password, saltRound)
}

module.exports = generatePassword