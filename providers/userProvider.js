const db = require('../db')
const ObjectId = require('mongodb').ObjectID

const getUserCollection = async () => {
    return db().then(res => res.collection('users'))
}
const getListUsers = async (startIndex = 0, count = 20) => {
    try {
        const userClt = await getUserCollection()
        return await userClt.find().skip(startIndex).limit(count).toArray()
    } catch (error) {
        throw error
    }
}
const createUser = async ({ firstName = '', lastName = '', avatar = '', address = '', password, email, privilege = 1 }) => {
    try {
        const userClt = await getUserCollection()
        const user = await getUserByEmail(email)
        if (user) {
            throw new Error('email_existed')
        }
        return await userClt.insertOne({
            "First-Name": firstName,
            "Last-Name": lastName,
            "Avatar": avatar,
            "Address": address,
            "Password": password,
            "Email": email,
            "Privilege": privilege,
            "Active": true
        })
    } catch (error) {
        throw error
    }
}
const getUserByEmail = async (email) => {
    try {
        const userClt = await getUserCollection()
        return await userClt.findOne({ "Email": email })
    } catch (error) {
        throw error
    }
}
const getUserByID = async (id) => {
    try {
        const userClt = await getUserCollection()
        return await userClt.findOne({ "_id": ObjectId(id), "Active": true })
    } catch (error) {
        throw error
    }
}
const deleteUserByID = async (id) => {
    try {
        const userClt = await getUserCollection()
        return await userClt.deleteOne({ "_id": ObjectId(id) })
    } catch (error) {
        throw error
    }
}
const activeUserByID = async (id, active) => {
    try {
        const userClt = await getUserCollection()
        return await userClt.updateOne({ "_id": ObjectId(id) }, {
            $set: {
                "Active": active
            }
        })
    } catch (error) {
        throw error
    }
}
const updateUser = async ({ id, firstName = '', lastName = '', avatar = '', address = '' }) => {
    try {
        const userClt = await getUserCollection()
        return await userClt.updateOne({ "_id": ObjectId(id) }, {
            $set: {
                "First-Name": firstName,
                "Last-Name": lastName,
                "Avatar": avatar,
                "Address": address
            }
        })
    } catch (error) {
        throw error
    }
}


module.exports = {
    createUser,
    updateUser,
    getUserByEmail,
    getUserByID,
    deleteUserByID,
    activeUserByID,
    getListUsers
}