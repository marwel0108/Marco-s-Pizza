const express = require('express');
const router = express.Router();
const DBController = require('../controllers/DBController');
const dbController = new DBController();
const StripeController = require('../controllers/StripeController');
const stripeController = new StripeController();

router.get('/', dbController.getPizzas);
router.post('/comprar/:pizza', dbController.getPizza);

router.post('/comprar/realizarPago/:pizza', stripeController.realizarPago);


module.exports = router;