import { loadCart } from "./cartUtils.js"

const cartContainer = document.getElementById("cart-container")

const getItems = localStorage.getItem("shoppingCart")
const retrievedItems = JSON.parse(getItems)

console.log(retrievedItems)

loadCart(cartContainer)