class CalcController {
    calcularImporte (precio, size, cantidad) {
        if (size == 'pequeña')  return precio * cantidad;
        else if (size == 'mediana') return (precio + 25) * cantidad;
        else return (precio + 50) * cantidad;
    }
}

module.exports = CalcController;