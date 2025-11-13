import { loadCart } from "./cartUtils.js"

const cartContainer = document.getElementById("cart-container")
const checkoutButton = document.getElementById("checkout")

const getItems = localStorage.getItem("shoppingCart")
const retrievedItems = JSON.parse(getItems)

console.log(retrievedItems)

loadCart(cartContainer)

const goToCheckout = document.createElement("button")
goToCheckout.classList.add("go-to-checkout-button")
goToCheckout.textContent = "Go to checkout"
checkoutButton.appendChild(goToCheckout)