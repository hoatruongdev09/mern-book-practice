const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = async (payload, options) => {
    try {
        return await jwt.sign(payload, process.env.APP_SECRET_KEY, options)
    } catch (error) {
        throw error
    }
}
const decodeToken = async (token) => {
    try {
        return await jwt.verify(token, process.env.APP_SECRET_KEY)
    } catch (error) {
        throw error
    }
}

module.exports = { generateToken, decodeToken }