import { loadCart, cartContent } from "./cartUtils.js"
import { updateCartCount } from "./cartUtils.js"

const cartContainer = document.getElementById("cart-container")
const checkoutButton = document.getElementById("checkout")

const getItems = localStorage.getItem("shoppingCart")
const retrievedItems = JSON.parse(getItems)

console.log(retrievedItems)

loadCart(cartContainer)

const goToCheckout = document.createElement("button")
goToCheckout.classList.add("go-to-checkout-button")
goToCheckout.textContent = "Go to checkout"

goToCheckout.addEventListener("click", function(){ //When button is clicked, navigate to checkout-page
    window.location.href="checkout.html"
})

checkoutButton.appendChild(goToCheckout)

function checkoutButtonVisibility(){
    if (cartContent.length === 0){
    goToCheckout.style.display="none"
} else {
    goToCheckout.style.display = "block"
}
}

checkoutButtonVisibility()

document.addEventListener("DOMContentLoaded", () =>{
    updateCartCount()
})
