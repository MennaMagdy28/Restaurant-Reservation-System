const express = require('express');
const { searchByName, searchByCategory } = require('../controllers/SearchController');

const router = express.Router();

router.get('/name/:q', searchByName);

router.get('/category/:q', searchByCategory);

module.exports = router;
