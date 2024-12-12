const express = require('express');
const { addRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant, getCategories } = require('../controllers/RestaurantController');
const checkVendorRole= require('../middleware/checkVendorRole');


const router = express.Router();

router.get('/getCategories', getCategories);
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

router.post('/',checkVendorRole, addRestaurant);
router.put('/:id',checkVendorRole,updateRestaurant);
router.delete('/:id',checkVendorRole, deleteRestaurant);

module.exports = router;
