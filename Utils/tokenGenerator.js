const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = async (payload) => {
    return await jwt.sign(payload, process.env.APP_SECRET_KEY, {
        algorithm: 'RS256'
    })
}

module.exports = generateToken