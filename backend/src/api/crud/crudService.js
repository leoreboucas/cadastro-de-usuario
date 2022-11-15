const Crud = require('./crud')

Crud.methods(['get', 'post', 'put', 'delete', 'options'])
Crud.updateOptions({ new: true, runValidators: true })
Crud.route('get', (req, res, next) => {
    Crud.find({}, (err, docs) => {
        if (!err) {
            res.json(docs)
        } else {
            res.status(500).json({ errors: [error] })
        }
    })
})

module.exports = Crud