const express = require('express');
const reserv = require('../controllers/ReservationController');

const router = express.Router()

// customer module 
router.post('/',reserv.newReservation);
router.delete('/:id',reserv.cancelReservation)
router.get('/customer/:customer_id',reserv.viewCustomerReservations)

//vendor module
router.get('/vendor/:restaurant_id',reserv.viewRestaurantReservations)

module.exports = router
