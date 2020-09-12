// imports
const router = require('express').Router()
const ctrl = require('../controllers')

//Views: Show, Index(organized by newest), Create, Edit/Delete

// routes
router.get('/', ctrl.screenshots.index)
router.get('/:id', ctrl.screenshots.show)
router.post('/', ctrl.screenshots.create)
router.put('/:id', ctrl.screenshots.update)
router.delete('/:id', ctrl.screenshots.destroy)

// exports
module.exports = router