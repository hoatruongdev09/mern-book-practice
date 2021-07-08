const mongoDB = require('mongodb')
const MongoDBClient = mongoDB.MongoClient
require('dotenv').config()

const uri = process.env.DB_URL

let db
const loadDB = async () => {
    if (db) { return db }
    try {
        const client = MongoDBClient(uri, { useUnifiedTopology: true })
        await client.connect()
        db = client.db('eLibrary')
        return db
    } catch (error) {
        console.log(error)
        throw error
    }

}

module.exports = loadDB


