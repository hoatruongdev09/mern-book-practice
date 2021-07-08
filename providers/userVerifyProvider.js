const db = require('../db')
const ObjectId = require('mongodb').ObjectID

const getUserVerifyCollection = async () => {
    return db().then(res => res.collection('user_verify'))
}

const createNewRecord = async (userId) => {
    try {
        const userVerifyClt = await getUserVerifyCollection()
        return await userVerifyClt.insertOne({ "User-ID": userId })
    } catch (error) {
        throw error
    }
}
const getRecordByID = async (id) => {
    try {
        const userVerifyClt = await getUserVerifyCollection()
        return await userVerifyClt.findOne({ "_id": new ObjectId(id) })
    } catch (error) {
        throw error
    }
}
const removeRecordByID = async (id) => {
    try {
        const userVerifyClt = await getUserVerifyCollection()
        return await userVerifyClt.deleteOne({ "_id": new ObjectId(id) })
    } catch (error) {
        throw error
    }
}
module.exports = {
    createNewRecord,
    getRecordByID,
    removeRecordByID
}