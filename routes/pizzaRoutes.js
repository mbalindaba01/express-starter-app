const PizzaPrices = require('../FactoryFunctions/PizzaPrices')
const pizzaPrices = PizzaPrices()

module.exports = () => {
    const addRoute = (req, res) => {
        pizzaPrices.setPizzaSize(req.body.size)
        pizzaPrices.setPizzaPrice(req.body.size)
        console.log(req.body.size)
        res.redirect('/')
    }

    const mainRoute = (req, res) => {
        res.render('index', {
            smallPrice: pizzaPrices.getSmallPizzaPrice(),
            medPrice: pizzaPrices.getMedPizzaPrice(),
            largePrice: pizzaPrices.getLargePizzaPrice(),
            smallQuantity: pizzaPrices.getNumOfSmallPizzas(),
            medQuantity: pizzaPrices.getNumOfMedPizzas(),
            largeQuantity: pizzaPrices.getNumOfLargePizzas(),
            totalCost: pizzaPrices.getOrderTotal()
        })
    }

    return {
        addRoute,
        mainRoute
    }
}