import { cartSummary } from "./cartUtils.js";
import { updateCartCount } from "./cartUtils.js";

const cartContainer = document.getElementById("cart-summary-container")

cartSummary(cartContainer)

const orderButton = document.getElementById("order-button")

const placeOrderButton = document.createElement("button")
placeOrderButton.classList.add("orderButton")
placeOrderButton.textContent = "Place order"
orderButton.appendChild(placeOrderButton)

placeOrderButton.addEventListener("click", function(){
    window.location.href="confirmation.html"
})


document.addEventListener("DOMContentLoaded", () =>{
    updateCartCount()
})

