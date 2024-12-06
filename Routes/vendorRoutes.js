const express = require('express');
const { addVendor, deleteVendor, getVendors } = require('../controllers/VendorController');
const router = express.Router();
router.get('/', getVendors);

router.use(require('../middleware/checkAdminRole'));
router.post('/', addVendor);
router.delete('/:id', deleteVendor);

module.exports = router;