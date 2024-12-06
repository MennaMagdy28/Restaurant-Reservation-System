const express = require('express');
const { addRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant, getCategories } = require('../controllers/RestaurantController');
const checkAdminRole = require('../middleware/checkAdminRole');


const router = express.Router();

router.get('/getCategories', getCategories);
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

router.post('/',checkAdminRole, addRestaurant);
router.put('/:id',checkAdminRole,updateRestaurant);
router.delete('/:id',checkAdminRole, deleteRestaurant);

module.exports = router;
