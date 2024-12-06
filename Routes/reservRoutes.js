const express = require('express');
const reserv = require('../controllers/ReservationController');
const checkCustomerRole = require('../middleware/checkCustomerRole'); 
const checkVendorRole = require('../middleware/checkVendorRole'); 


const router = express.Router()

router.use(require('../middleware/verifyJWT.js'))
// customer module 
router.post('/',checkCustomerRole,reserv.newReservation);
router.delete('/:id',checkCustomerRole,reserv.cancelReservation)
router.get('/customer/:customer_id',checkCustomerRole,reserv.viewCustomerReservations)

//vendor module
router.get('/vendor/:restaurant_id',checkVendorRole,reserv.viewRestaurantReservations)

module.exports = router
