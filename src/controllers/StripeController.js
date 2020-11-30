const stripe = require('stripe')('sk_test_51HnbioIuQrTycj1NInXuHvTp5eXmUnmurpix8DKwLcVtG3JeqajelyCAUWIhvJZaOVjOUoczjBvnS7rBBmTLhPml00mNkP2olF');
const DBController = require('./DBController');
const dbController = new DBController();


class StripeController {
    async realizarPago(req, res) {
        const cliente = await stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken
        });
        const charge = await stripe.charges.create({
            amount: req.body.importe,
            currency: 'usd',
            customer: cliente.id
        });

        dbController.nuevaCompra(req, res);
        res.redirect('/');
    }
}

module.exports = StripeController;


