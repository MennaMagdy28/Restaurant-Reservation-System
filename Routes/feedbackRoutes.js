const express = require('express');
const { submitFeedback, deleteFeedback } = require('../controllers/FeedbackController');

const router = express.Router();

router.use(require('../middleware/verifyJWT'));
router.use(require('../middleware/checkCustomerRole'))

router.post('/', submitFeedback);
router.delete('/:id', deleteFeedback);

module.exports = router;
