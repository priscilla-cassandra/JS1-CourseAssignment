import { addToCart } from "./cartUtils.js";
import { updateCartCount } from "./cartUtils.js";

const endpointUrl = "https://v2.api.noroff.dev/rainy-days";
const loadingIndicator = document.getElementById("loading-container")

//Fetching products from the Noroff API and converting it to JSON data

let allProducts = []; //Variable outside the function, so it can be accessed anywhere in the script
let cartContent = []; //Variable for contents in the cart

async function fetchAllProducts() {
  
    loadingIndicator.style.display = "block" //Show loading indicator before the asynchronous function runs
    try {
    const response = await fetch(endpointUrl);
    const json = await response.json();

    allProducts = json.data; //Assigning products to the global variable

    console.log(allProducts);

    displayProducts(allProducts);
  } catch (error) {
    console.error("Error fetching products", error);
  } finally{
    loadingIndicator.style.display = "none" //Hide the loading indicator when the asynch function is done
  }
}

//Display products and create a div element for each product
function displayProducts(products) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product");

    //Create anchor tag for each product
    const productLink = document.createElement("a");
    productLink.classList.add("product-link");
    productLink.href = `single-product.html?id=${product.id}`;

    productLink.innerHTML = `
  <img src="${product.image.url}" alt="${product.image.alt}">
   <h3>${product.title}</h3>
  <p>Price: $${product.price}</p>
`;
    //Create add-to-cart button
    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("add-to-cart-button"); 
    addToCartButton.textContent = "Add to cart"; 

    productItem.appendChild(productLink);
    productItem.appendChild(addToCartButton);
    productContainer.appendChild(productItem);

    //EventListener click
    addToCartButton.addEventListener("click", function () {
      //When the button is clicked, run the addToCart function, which adds the product
      addToCart(product);
    });
  });
}

console.log(cartContent);
fetchAllProducts();

//Filtering for gender

const filterForm = document.getElementById("filter-form"); //Get filter
const dropdownMenu = document.getElementById("gender-filter"); //Get dropdown menu

dropdownMenu.addEventListener("change", () => {
  const selectedValue = dropdownMenu.value;

  let filteredProducts; //Variable to store filtered value

  if (selectedValue === "all") {
    //If the selected value is "all"
    filteredProducts = allProducts; //Display all products
  } else if (selectedValue === "female") {
    //If the selected value is "female"
    filteredProducts = allProducts.filter((product) => {
      return product.gender === "Female"; //Display all products with the key gender, and value "Female"
    });
  } else if (selectedValue === "male") {
    //If the selected value is "male"
    filteredProducts = allProducts.filter((product) => {
      return product.gender === "Male"; //Display all products with the gender key and "Male" value
    });
  }
  displayProducts(filteredProducts); //Calling the displayProducts function to display filtered products based on the users choice
});
 
document.addEventListener("DOMContentLoaded", () =>{
    updateCartCount()
})







