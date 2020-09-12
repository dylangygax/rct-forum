// imports
const router = require('express').Router()
const ctrl = require('../controllers')

//Views: Show (Profile), Register, Login, Edit/Delete

// routes
router.get('/', ctrl.users.index)
//router.post('/results', ctrl.users.results)
router.get('/:id', ctrl.users.show)
router.post('/', ctrl.users.create)
router.put('/:id', ctrl.users.update)
router.delete('/:id', ctrl.users.destroy)

// exports
module.exports = router