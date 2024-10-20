const warrantiesRouter = require('express').Router();
const warrantiesController = require('../controllers/warranty');

 
warrantiesRouter.get('/', warrantiesController.getAll);
warrantiesRouter.get('/:id', warrantiesController.getById);
warrantiesRouter.post('/', warrantiesController.postRecord);
warrantiesRouter.put('/:id', warrantiesController.putRecord);
warrantiesRouter.delete('/:id', warrantiesController.deleteRecord);

module.exports = warrantiesRouter;