const express = require('express');
const { addTable, deleteTable, isReserved, getAvailable, getTables, getTimeslots } 
= require('../controllers/TableController');


const router = express.Router();
router.get('/isReserved/',isReserved);
router.get('/Available/',getAvailable);
router.get('/Tables/',getTables);
router.get('/Timeslots/',getTimeslots);

router.use(require('../middleware/checkVendorRole'));
router.post('/', addTable);
router.delete('/:id', deleteTable);

module.exports = router;
