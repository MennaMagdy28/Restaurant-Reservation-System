const express = require('express');
const { addTable, deleteTable } = require('../controllers/TableController');


const router = express.Router();
router.use(require('../middleware/checkVendorRole'));
router.post('/', addTable);
router.delete('/:id', deleteTable);

module.exports = router;
