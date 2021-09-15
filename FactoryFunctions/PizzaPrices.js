module.exports = (pool) => {
    let pizzaSize = ""
    let smallPizzaPrice = 0
    let medPizzaPrice = 0
    let largePizzaPrice = 0
    let numOfSmallPizzas = 0
    let numOfMedPizzas = 0
    let numOfLargePizzas = 0
    let btnText = "Pay"
    let orderNum = 0
    let status = ""


    const setOrderNum = (num) => {
        orderNum = num
    }

    const getOrderNum = () => {
        return orderNum
    }

    const setStatus = () => {
    }

    const getStatus = async () => {
        status = await pool.query('select order_status from orders where order_num = $1', [getOrderNum()])
        return status.rows[0].order_status
    }

    const updateStatus = async () => {
        if(await getStatus() === "Payment Due"){
            pool.query('update orders set order_status = $1, action_required = $2 where order_num = $3', ['Paid', 'Collect', getOrderNum()])
        }else if(await getStatus() == "Paid"){
            pool.query('update orders set order_status = $1, action_required = $2 where order_num = $3', ['Collected', '', getOrderNum()])
        }
    }

    const resetPrices = () => {
        smallPizzaPrice = 0
        medPizzaPrice = 0
        largePizzaPrice = 0
        numOfLargePizzas = 0
        numOfMedPizzas = 0
        numOfSmallPizzas = 0
        
    }

    const resetDb = async() => {
        await pool.query('truncate orders')
    }

    // const setUpdatedStatus = async() => {
    //     updatedStatus = pool.query('select order_status from orders where order_num = $1', [getOrderNum()])
    // }

    // const getUpdatedStatus = () => {
    //     return updatedStatus
    // }
    

    const getBtnText = () => {
        return btnText
    }

    // const updateBtnText = () => {
    //     if(updateStatus() == "Payment Due"){
    //         return "Pay"
    //     }else if(updateStatus() == "Paid"){
    //         return "Collect"
    //     }else {
    //         return ""
    //     }
    // }



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
        pool.query("insert into ORDERS(order_amount, action_required) values ($1, $2)", [getOrderTotal(), getBtnText()])
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
        getBtnText,
        setOrderNum,
        getOrderNum,
        updateStatus,
        resetPrices,
        resetDb
        // setUpdatedStatus,
        // getUpdatedStatus
        // fetchBtnText

    }
}