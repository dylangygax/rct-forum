// imports
const router = require('express').Router()
const ctrl = require('../controllers')

//Views: Show, Index, Create, Approval Queue

// routes
router.get('/', ctrl.parks.index)
router.get('/:id', ctrl.parks.show)
router.post('/', ctrl.parks.create)
router.put('/:id', ctrl.parks.update)
router.delete('/:id', ctrl.parks.destroy)

// exports
module.exports = router