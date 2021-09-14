module.exports = () => {
    let pizzaSize = ""
    let smallPizzaPrice = 0
    let medPizzaPrice = 0
    let largePizzaPrice = 0
    let numOfSmallPizzas = 0
    let numOfMedPizzas = 0
    let numOfLargePizzas = 0
    let orderStatus = ""

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

    const updateStatus = (status) => {
        orderStatus = status
    }

    const getStatus = () => {
        return orderStatus
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
        updateStatus,
        getStatus
    }
}