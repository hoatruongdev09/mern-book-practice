const Router = require('express').Router()
const userProvider = require('../providers/userProvider')

const validateUserRegisterInputMiddleware = require('../middlewares/validateUserRegisterInput')
const generateHashPasswordMiddleware = require('../middlewares/hashRegisterPassword')

const mailSender = require('../utils/mailSender')
const tokenGenerator = require('../utils/tokenGenerator')

Router.get('/', async (req, res) => {
    try {
        const result = await userProvider.getListUsers()
        res.status(200).json(result)
    } catch (error) {
        throw error
    }
})
Router.get('/verify/:token', async (req, res) => {
    try {
        const payload = await tokenGenerator.decodeToken(req.params.token || '')
        const result = await userProvider.activeUserByID(payload.user_id, true)
        console.log('result: ', result)
        res.status(200).json(payload)
    } catch (error) {
        res.status(500).json({ message: error.message })
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
        if (user) {
            const deletedUserCount = await userProvider.deleteUserByID(user._id)
            return res.status(200).json({ rowDeleted: deletedUserCount.result.n })
        }
        res.status(404).json({ message: "user_not_found" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
Router.post('/', validateUserRegisterInputMiddleware, generateHashPasswordMiddleware, async (req, res) => {
    try {
        const result = await userProvider.createUser(req.body)
        const registeredUser = result.ops[0]
        const userID = registeredUser._id.toString()
        const token = await tokenGenerator.generateToken({ user_id: userID }, {
            expiresIn: '7d'
        })

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