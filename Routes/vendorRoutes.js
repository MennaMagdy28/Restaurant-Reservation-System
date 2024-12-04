const express = require('express');
const { addVendor, deleteVendor, getVendors } = require('../controllers/VendorController');
const router = express.Router();

router.post('/', addVendor);
router.delete('/:id', deleteVendor);
router.get('/', getVendors);

module.exports = router;