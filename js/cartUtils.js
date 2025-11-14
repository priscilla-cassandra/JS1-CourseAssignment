//Add to cart functionality
export let cartContent = [];

export function addToCart(product) {
  const savedCart = localStorage.getItem("shoppingCart"); //loads current cart from localStorage before pushing new product to the cart
  if (savedCart) {
    cartContent = JSON.parse(savedCart);
  } else {
    cartContent = [];
  }
  cartContent.push(product); //Push the product to the shopping-cart
  saveCart();
  updateCartCount();
  console.log(`${product.title} added to cart!`);
}

function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cartContent)); //"shoppingCart" is the key you want to create. JSON.stringify(cartContent) is the data that is being stored. Here we are storing the cartContent
}

export function loadCart(cartContainer) {
  // 1. Retrieve items from local storage
  const savedCart = localStorage.getItem("shoppingCart");
  if (savedCart) {
    cartContent = JSON.parse(savedCart);
  } else {
    cartContent = [];
  }

  // Always clear the container before re-rendering
  cartContainer.innerHTML = "";

  // 2. If cart is empty, show message and stop
  if (cartContent.length === 0) {
    cartContainer.textContent = "Your cart is empty";
    return;
  }

  // 3. Group duplicates by product.id
  const groupedCart = [];

  cartContent.forEach((product) => {
    const existing = groupedCart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      // copy product and add quantity field
      groupedCart.push({ ...product, quantity: 1 });
    }
  });

  let totalItems = 0;

  // 4. Render each unique product with its quantity
  groupedCart.forEach((product) => {
    totalItems += product.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    // Image
    const image = document.createElement("img");
    image.classList.add("image");
    image.src = product.image.url;
    image.alt = product.image.alt;
    cartItem.appendChild(image);

    // Product title
    const title = document.createElement("h2");
    title.classList.add("product-title");
    title.textContent = product.title;
    cartItem.appendChild(title);

    // Product price
    const price = document.createElement("p");
    price.classList.add("product-price");
    price.textContent = `$${product.price}`;
    cartItem.appendChild(price);

    // Quantity
    const quantity = document.createElement("p");
    quantity.classList.add("product-quantity"); // add this class in CSS if you want
    quantity.textContent = `Quantity: ${product.quantity}`;
    cartItem.appendChild(quantity);

    // Remove ONE of this product
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove 1";
    cartItem.appendChild(removeButton);

    removeButton.addEventListener("click", function () {
      // find ONE matching item in the original cartContent
      const index = cartContent.findIndex((item) => item.id === product.id);

      if (index !== -1) {
        // remove just one instance
        cartContent.splice(index, 1);
        saveCart();
        loadCart(cartContainer); // re-render with updated quantities
      }
    });

    cartContainer.appendChild(cartItem);
  });

  // 5. Show total items in cart
  const totalElement = document.createElement("p");
  totalElement.classList.add("cart-total-items");
  totalElement.textContent = `Total items in cart: ${totalItems}`;
  cartContainer.appendChild(totalElement);
}

// add a function to remove all items from the cart
 

//////////Cart summary//////// Created by reusing much of the code from the loadCart function

export function cartSummary(cartContainer){

  const savedCart = localStorage.getItem("shoppingCart");
  if (savedCart) {
    cartContent = JSON.parse(savedCart);
  } else {
    cartContent = [];
  }

  cartContainer.innerHTML = ""

  if (cartContent.length === 0){
    cartContainer.textContent = "Your cart is empty"
    return
  }

  const groupedCart = [];

  cartContent.forEach((product) => {
    const existing = groupedCart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      // copy product and add quantity field
      groupedCart.push({ ...product, quantity: 1 });
    }
  });

  let totalItems = 0;
  let totalPrice = 0

  groupedCart.forEach((product) => {
    totalItems += product.quantity;
    totalPrice += product.price * product.quantity

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    // Image
    const image = document.createElement("img");
    image.classList.add("image");
    image.src = product.image.url;
    image.alt = product.image.alt;
    cartItem.appendChild(image);

    // Product title
    const title = document.createElement("h2");
    title.classList.add("product-title");
    title.textContent = product.title;
    cartItem.appendChild(title);

    // Product price
    const price = document.createElement("p");
    price.classList.add("product-price");
    price.textContent = `$${product.price}`;
    cartItem.appendChild(price);

    // Quantity
    const quantity = document.createElement("p");
    quantity.classList.add("product-quantity"); // add this class in CSS if you want
    quantity.textContent = `Quantity: ${product.quantity}`;
    cartItem.appendChild(quantity);

    cartContainer.appendChild(cartItem)
});

const priceTotal = document.createElement("p")
  priceTotal.classList.add("cart-summary-total")
  priceTotal.textContent = `Total (${totalItems} items): $${totalPrice.toFixed(2)}`
  cartContainer.appendChild(priceTotal)

}


/////////////UPDATE CART COUNT ON CART ICON////////////////

export function updateCartCount (){

  console.log("The updateCartCount function is running!")
  const cartCountIcon = document.getElementById("cart-count") //Get access to the cart icon

  const savedCart = localStorage.getItem("shoppingCart") //Gets the saved cart from local storage (!!!AS A STRING)

  const cart = savedCart ? JSON.parse(savedCart) : [] //This line converts the string in to an actual array. [] = use empty array if cart is empty

  const totalItems = cart.length //The number of items is the same as the length of the array that is currently saved

  cartCountIcon.textContent = totalItems //The text content (counter) on the cartIcon is changed to number of totalItems in the cart
}