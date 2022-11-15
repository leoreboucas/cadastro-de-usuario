const restful = require('node-restful')
const mongoose = restful.mongoose

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {type: String, required: true}
})

const crudSchema = new mongoose.Schema({
    users: [userSchema]
})

module.exports = restful.model('Crud', crudSchema)