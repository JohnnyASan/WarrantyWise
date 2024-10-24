const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger-output.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

 
router.use('/warranties', require('./warranties'));

module.exports = router;
