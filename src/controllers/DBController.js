const { getAllPizzas, getOnePizza, nuevaCompra } = require('./SQLQueries');
const CalController = require('./CalcControllers');
const calController = new CalController();


class DBController {
    getPizzas(req, res) {
        req.getConnection((err, conn) => {
            const query = getAllPizzas.query;
            if (err) {
                throw err;
            }
            conn.query(query, (err, pizzas) => {
                if (err) throw err;
                const elementos = {
                    pizzas: [...pizzas]
                }
                res.render('index', elementos);
            })
        })
    }

    getPizza(req, res) {
        req.getConnection((err, conn) => {
            const pizzaP = req.params.pizza;
            const size = req.body.tamaños;
            const cantidad = req.body.numero;
            let id;
            if (pizzaP == 'Pepperoni') id = 1;
            else if (pizzaP == 'Hawaiana') id = 2;
            else id = 3;
            const query = getOnePizza.query.replace('?', id);
            if (err) throw err;
            conn.query(query, (err, pizza) => {
                if (err) throw err;
                const importe = calController.calcularImporte(pizza[0].precio, size, cantidad);
                pizza[0].cantidad = cantidad;
                pizza[0].importe = importe;
                pizza[0].size = size;
                res.render('ProductTemplate', {
                    pizza: [...pizza]
                });
            })
        })
    }

    nuevaCompra(req, res) {
        req.getConnection((err, conn) => {
            const query = nuevaCompra.query + `('${req.body.nombre}', ${req.body.importe}, '${req.body.cantidad[1]}', '${req.body.direccion}', '${req.body.descripcion}')`;
            if (err) throw err;
            conn.query(query, (err, resultado) => {
                if(err) throw err;
                return resultado;
            })
        })
    }
}

module.exports = DBController;