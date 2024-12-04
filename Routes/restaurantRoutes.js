const express = require('express');
const { addRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant, getCategories } = require('../controllers/RestaurantController');

const router = express.Router();

router.get('/getCategories', getCategories);
router.post('/', addRestaurant);
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

module.exports = router;