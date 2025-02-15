const flash = require('express-flash')
const session = require('express-session')
const express = require('express')
const exphbs = require('express-handlebars')
const { Pool } = require('pg')
const PizzaRoutes = require('./routes/pizzaRoutes')

const pizzaRoutes = PizzaRoutes()

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

app.get('/', pizzaRoutes.mainRoute)

app.post('/main', pizzaRoutes.addRoute)

app.post('/orders', pizzaRoutes.updateOrder)

app.get('/orderList', pizzaRoutes.orderList)

app.post('/update', pizzaRoutes.updateStatus)

app.post('/reset', pizzaRoutes.resetOrders)

app.post('/back', pizzaRoutes.goBack)


const PORT = process.env.PORT || 3011

app.listen(PORT, () => {
    console.log("App is running at port " + PORT)
})