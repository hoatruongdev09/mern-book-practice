module.exports = verifyUserMiddleware = (req, res, next) => {
    const token = req.params.token
    if (token.length != 12 && token.length != 24) {
        return res.status(400).json("bad_token")
    }
    next()
}