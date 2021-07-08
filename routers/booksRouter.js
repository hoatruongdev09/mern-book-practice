const express = require('express')

const Router = express.Router()

const bookProvider = require('../providers/booksProvider')

Router.get('/', async (req, res) => {

    try {
        const result = await bookProvider.getBooks(req.query)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
Router.get('/:id', async (req, res) => {
    try {
        const result = await bookProvider.getBookByID(req.params.id)
        if (result) {
            return res.status(200).json(result)
        }
        res.status(404).json({ message: "book_not_found" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
Router.delete('/:id', async (req, res) => {
    try {
        const result = await bookProvider.deleteBookByID(req.params.id)
        res.status(200).json({ rowDeleted: result.result.n })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
Router.post('/', async (req, res) => {
    try {
        const result = await bookProvider.createBook(req.body)
        res.status(200).json(result.ops[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
Router.put('/:id', async (req, res) => {
    try {
        await bookProvider.updateBook({ id: req.params.id, ...req.body })
        const result = await bookProvider.getBookByID(req.params.id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = Router