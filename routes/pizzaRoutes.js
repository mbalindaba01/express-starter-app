const { Pool } = require('pg')
const PizzaPrices = require('../FactoryFunctions/PizzaPrices')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://rlfncsmqavuqjs:2482b813d6550dfd9fadbdb02b33f40e67e6e895a6db848db8ff2002f570f7bc@ec2-54-156-24-159.compute-1.amazonaws.com:5432/d3dfsm93k04okc',
    ssl: {
      rejectUnauthorized: false
    }
})

const pizzaPrices = PizzaPrices(pool)

module.exports = () => {

    const addRoute = (req, res) => {
        if(!req.body.size){
            req.flash('warning', 'Please select at least one pizza')
        }else {
            pizzaPrices.setPizzaSize(req.body.size)
            pizzaPrices.setPizzaPrice(req.body.size)
        }
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
            totalCost: pizzaPrices.getOrderTotal().toFixed(2),
            message: req.flash('warning')
        })
    }

    const orderList = async (req, res) => {
        await pizzaPrices.getFromDatabase()
        .then(result => {
            console.table(result.rows)
            res.render('orders', {
                data: result.rows,
            })
        })
    }

    const updateOrder = (req, res) => {
        pizzaPrices.addToDatabase()
        pizzaPrices.resetPrices()
        res.redirect('/')
    }

    const updateStatus = async (req, res) => {
        pizzaPrices.setOrderNum(req.body.actionRequired)
        pizzaPrices.updateStatus()
        console.log(await pizzaPrices.getStatus())
        res.redirect('/orderList')
    }

    const resetOrders = (req, res) => {
        pizzaPrices.resetDb()
        res.redirect('/orderList')
    }

    return {
        addRoute,
        mainRoute,
        orderList,
        updateOrder,
        updateStatus,
        resetOrders
    }
}