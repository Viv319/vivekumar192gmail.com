const express = require('express');
const router = express.Router();
const formController = require('../controller/form');

router.post('/createForm', formController.createForm);
router.get('/getForm/:id', formController.getForm);

module.exports = router;
