module.exports = {
    getAllPizzas: {
        query: "SELECT * FROM pizzas"
    },
    getOnePizza: {
        query: "SELECT * FROM pizzas WHERE id = ?"
    },
    nuevaCompra: {
        query: "CALL nuevaCompra"
    }
}