const express = require('express');
const table = require('../controllers/ta');


const router = express.Router();
router.use(require('../middleware/checkVendorRole'));
router.post('/', addTable);
router.delete('/:id', deleteTable);

module.exports = router;
