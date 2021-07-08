const generatePassword = require('../utils/generateHashPassword')

const generateHashPasswordMiddleware = async (req, res, next) => {
    const { password } = req.body
    const hashPassword = await generatePassword(password)
    req.body.password = hashPassword
    next()
}

module.exports = generateHashPasswordMiddleware