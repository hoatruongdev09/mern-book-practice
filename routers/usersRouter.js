const Router = require('express').Router()
const userProvider = require('../providers/userProvider')

const validateUserRegisterInputMiddleware = require('../middlewares/validateUserRegisterInput')
const generateHashPasswordMiddleware = require('../middlewares/hashRegisterPassword')

const mailSender = require('../Utils/mailSender')
const tokenGenerator = require('../Utils/tokenGenerator')

Router.get('/', async (req, res) => {
    try {
        const result = await userProvider.getListUsers()
        res.status(200).json(result)
    } catch (error) {
        throw error
    }
})

Router.get('/:id', async (req, res) => {
    try {
        const result = await userProvider.getUserByID(req.params.id)
        if (result) {
            return res.status(200).json(result)
        } else {
            return res.status(404).json({ message: "user_not_found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
Router.put('/:id', async (req, res) => {
    try {
        await userProvider.updateUser({ id: req.params.id, ...req.body })
        const updatedUser = await userProvider.getUserByID(req.params.id)
        if (updatedUser) {
            return res.status(200).json(updatedUser)
        }
        res.status(404).json({ message: "user_not_found" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
Router.delete('/:email', async (req, res) => {
    try {
        const user = await userProvider.getUserByEmail(req.params.email)
        const deletedUserCount = await userProvider.deleteUserByID(user._id)
        res.status(200).json({ rowDeleted: deletedUserCount.result.n })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
Router.post('/', validateUserRegisterInputMiddleware, generateHashPasswordMiddleware, async (req, res) => {
    try {
        const result = await userProvider.createUser(req.body)
        const registeredUser = result.ops[0]
        const userID = registeredUser._id
        const token = await tokenGenerator({ user_id: userID })
        const mailSendResult = await mailSender({
            to: registeredUser.Email,
            subject: 'Confirm email',
            text: `please click link: localhost:${process.env.PORT || 8000}/verify/${token}`
        })
        console.log(mailSendResult)
        res.status(200).json({ message: "OK" })
    } catch (error) {
        console.log(error.message)
        if (error.message == "email_existed") {
            return res.status(400).send({ message: error.message })
        } else {
            return res.status(500).json({ message: error.message })
        }
    }
})

module.exports = Router