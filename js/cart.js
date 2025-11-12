const getItems = localStorage.getItem("shoppingCart")
const retrievedItems = JSON.parse(getItems)

console.log(retrievedItems)