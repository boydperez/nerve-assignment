const express = require('express');
const AppError = require('../utils/app-error');
const recordController = require('./../controllers/record-controller');

const router = express.Router();

router
    .route('/')
    .get(recordController.getAllRecords)
    .post(recordController.createRecord);

router
    .route('/:id')
    .get(recordController.getRecord)
    .patch(recordController.updateRecord)
    .delete(recordController.deleteRecord);

module.exports = router;