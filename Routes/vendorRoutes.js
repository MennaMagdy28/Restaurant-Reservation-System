const express = require('express');
const { addVendor, deleteVendor, getVendors } = require('../controllers/VendorController');
const router = express.Router();

router.post('/add', addVendor);
router.delete('/delete/:id', deleteVendor);
router.get('/get', getVendors);

module.exports = router;