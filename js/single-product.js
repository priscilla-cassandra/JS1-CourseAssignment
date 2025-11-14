import { addToCart } from "./cartUtils.js";
import { updateCartCount } from "./cartUtils.js";
const container = document.getElementById("single-product-container");
const endpointUrl = "https://v2.api.noroff.dev/rainy-days";
const loadingIndicator = document.getElementById("loading-container")
 
async function fetchAndCreateProduct() {
    loadingIndicator.style.display = "block" //Show loading indicator before the asynchronous function runs
    try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
 
    if (!id) {
      container.textContent = "No ID provided";
      return;
    }
 
    const response = await fetch(`${endpointUrl}/${id}`);
    const data = await response.json();
    const product = data.data;
 
    //Create product div
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-details");
 
    //Create image
    const image = document.createElement("img");
    image.classList.add("product-image");
    image.src = product.image.url;
    image.alt = product.image.alt;
    productDiv.appendChild(image);
 
    //Create product title
    const title = document.createElement("h2");
    title.classList.add("product-title");
    title.textContent = product.title;
    productDiv.appendChild(title);
 
    //Create product price
    const price = document.createElement("p");
    price.classList.add("product-price");
    price.textContent = `$${product.price}`;
    productDiv.appendChild(price);
 
    //Create product description
    const description = document.createElement("p");
    description.classList.add("product-description");
    description.textContent = product.description;
    productDiv.appendChild(description);
 
    //Create add-to-cart button
    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("add-to-cart-button");
    addToCartButton.textContent = "Add to cart";

    addToCartButton.addEventListener("click", function () {
      //When the button is clicked, run the addToCart function, which adds the product
      addToCart(product);
    });
    productDiv.appendChild(addToCartButton);
 
    //Create back-to-products button
    const backButton = document.createElement("a");
    backButton.classList.add("back-button");
    backButton.textContent = "Back to products";
    backButton.href = "products.html";
    productDiv.appendChild(backButton);
 
    //Append to main container
    container.appendChild(productDiv);
  } catch (error) {
    console.error("Failed to fetch products", error);
    container.textContent = "Failed to load product";
  } finally{
    loadingIndicator.style.display = "none" //Hide the loading indicator when the asynch function is done
  }
}
 
fetchAndCreateProduct();

document.addEventListener("DOMContentLoaded", () =>{
    updateCartCount()
})