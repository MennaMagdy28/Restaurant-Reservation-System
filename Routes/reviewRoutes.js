const express = require('express');
const { getReviews, submitReview, editReview, deleteReview} = require('../controllers/ReviewController');

const router = express.Router();

router.use(require('../middleware/verifyJWT'));
router.use(require('../middleware/checkCustomerRole'))

router.get('/', getReviews);
router.post('/', submitReview);
router.put("/:review_id", editReview);
router.delete('/:review_id', deleteReview);

module.exports = router;
