const db = require('../db')
const ObjectId = require('mongodb').ObjectID

const getBookCollection = async () => {
    return db().then(res => res.collection('books'))
}

const getBooks = async ({ pageIndex = 0, pageCount = 20 }) => {
    try {
        const bookClt = await getBookCollection();
        return await bookClt.find().skip(+pageIndex).limit(+pageCount).toArray()
    } catch (error) {
        throw error
    }
}
const getBookByID = async (id) => {
    try {
        const bookClt = await getBookCollection();
        return await bookClt.findOne({ "_id": ObjectId(id) })
    } catch (error) {
        throw error
    }
}
const deleteBookByID = async (id) => {
    try {
        const bookClt = await getBookCollection();
        return await bookClt.deleteOne({ "_id": ObjectId(id) })
    } catch (error) {
        throw error
    }
}
const createBook = async ({ ISBN, BookTitle, BookAuthor, YearOfPublication, Publisher, ImageURLS, ImageURLM, ImageURLL }) => {
    try {
        const bookClt = await getBookCollection()
        return await bookClt.insertOne({
            "ISBN": ISBN,
            "Book-Title": BookTitle,
            "Book-Author": BookAuthor,
            "Year-Of-Publication": YearOfPublication,
            "Publisher": Publisher,
            "Image-URL-S": ImageURLS,
            "Image-URL-M": ImageURLM,
            "Image-URL-L": ImageURLL,
        })
    } catch (error) {
        throw error
    }
}
const updateBook = async ({ id, ISBN, BookTitle, BookAuthor, YearOfPublication, Publisher, ImageURLS, ImageURLM, ImageURLL }) => {
    try {
        const bookClt = await getBookCollection()
        return await bookClt.updateOne({ "_id": ObjectId(id) }, {
            $set: {
                "ISBN": ISBN,
                "Book-Title": BookTitle,
                "Book-Author": BookAuthor,
                "Year-Of-Publication": YearOfPublication,
                "Publisher": Publisher,
                "Image-URL-S": ImageURLS,
                "Image-URL-M": ImageURLM,
                "Image-URL-L": ImageURLL
            }
        })
    } catch (error) {
        throw error
    }
}
module.exports = { getBooks, getBookByID, deleteBookByID, createBook, updateBook }


