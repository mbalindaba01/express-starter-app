module.exports = (pool) => {
    let pizzaSize = ""
    let smallPizzaPrice = 0
    let medPizzaPrice = 0
    let largePizzaPrice = 0
    let numOfSmallPizzas = 0
    let numOfMedPizzas = 0
    let numOfLargePizzas = 0
    let orderStatus = "Payment Due"
    let btnText = "Pay"

    const setStatus = () => {
        if(orderStatus == "Payment Due"){
            btnText = "Pay"

        }else if(getStatus() == "Paid"){
            btnText = "Collect"
            orderStatus = "Collected"
        }else if(getStatus() == "Collected"){
            btnText = ""
        }
    }

    const getBtnText = () => {
        return btnText
    }

    const getStatus = () => {
        return orderStatus
    }

    const setPizzaSize = (size) => {
        pizzaSize = size
    }

    const getPizzaSize = () => {
        return pizzaSize
    }

    const setPizzaPrice = (size) => {
        if(size === "Small"){
            smallPizzaPrice += 30.99
            numOfSmallPizzas++
        }else if(size === "Medium"){
            medPizzaPrice += 45.99
            numOfMedPizzas++
        }else if(size === "Large"){
            largePizzaPrice += 59.99
            numOfLargePizzas++
        }
    }

    const getSmallPizzaPrice = () => {
        return smallPizzaPrice
    }

    const getMedPizzaPrice = () => {
        return medPizzaPrice
    }

    const getLargePizzaPrice = () => {
        return largePizzaPrice
    }

    const getOrderTotal = () => {
        return smallPizzaPrice + medPizzaPrice + largePizzaPrice
    }

    const getNumOfSmallPizzas = () => {
        return numOfSmallPizzas
    }

    const getNumOfMedPizzas = () => {
        return numOfMedPizzas
    }

    const getNumOfLargePizzas = () => {
        return numOfLargePizzas
    }

    const addToDatabase = () => {
        pool.query("insert into ORDERS(order_status, order_amount) values ($1, $2)", [getStatus(), getOrderTotal()])
    }

    const getFromDatabase = async () => {
        return await pool.query("select * from orders")
    }


    return {
        setPizzaSize,
        getPizzaSize,
        setPizzaPrice,
        getSmallPizzaPrice,
        getMedPizzaPrice,
        getLargePizzaPrice,
        getOrderTotal,
        getNumOfSmallPizzas,
        getNumOfMedPizzas,
        getNumOfLargePizzas,
        addToDatabase,
        getFromDatabase,
        setStatus,
        getStatus,
        // updateStatus,
        // getStatus,
        getBtnText,
        // setOrderNum,
        // getOrderNum,
        // updateDb,
        // fetchBtnText

    }
}