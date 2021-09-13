const flash = require('express-flash')
const session = require('express-session')
const express = require('express')
const exphbs = require('express-handlebars')
const { Pool } = require('pg')
const PizzaPrices = require('./FactoryFunctions/PizzaPrices')

const pizzaPrices = PizzaPrices()

const app = express()

//set up pool connection to database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

// initialise session middleware - flash-express depends on it
app.use(session({
  secret : "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}))

// initialise the flash middleware
app.use(flash())


//set up middleware
app.engine('handlebars', exphbs({layoutsDir: "views/layouts/"}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.render('index', {
    smallPrice: pizzaPrices.getSmallPizzaPrice(),
    medPrice: pizzaPrices.getMedPizzaPrice(),
    largePrice: pizzaPrices.getLargePizzaPrice(),
    smallQuantity: pizzaPrices.getNumOfSmallPizzas(),
    medQuantity: pizzaPrices.getNumOfMedPizzas(),
    largeQuantity: pizzaPrices.getNumOfLargePizzas(),
    totalCost: pizzaPrices.getOrderTotal()
  })
})

app.post('/main', (req, res) => {
  pizzaPrices.setPizzaSize(req.body.size)
  pizzaPrices.setPizzaPrice(req.body.size)
  console.log(req.body.size)
  res.redirect('/')
})

const PORT = process.env.PORT || 3011

app.listen(PORT, () => {
    console.log("App is running at port " + PORT)
})