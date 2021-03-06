const validateEmail = require('../utils/emailValidation')
const validatePassword = require('../utils/validatePassword')

const validateUserRegisterInput = (req, res, next) => {
    const { password, email } = req.body
    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'email_invalid' })
    }
    if (!validatePassword(password)) {
        return res.status(400).json({ message: 'password_invalid' })
    }
    next()
}

module.exports = validateUserRegisterInput