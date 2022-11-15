const express = require('express')

module.exports = (server) => {
    const router = express.Router()
    server.use('/api', router)

    const Crud = require('../api/crud/crudService')
    Crud.register(router, '/crud')
}