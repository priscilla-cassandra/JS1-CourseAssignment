//Add to cart functionality
let cartContent = [];

export function addToCart(product) {
  cartContent.push(product); //Push the product to the shopping-cart
  saveCart();
  console.log(`${product.title} added to cart!`);
}

function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cartContent)); //"shoppingCart" is the key you want to create. JSON.stringify(cartContent) is the data that is being stored. Here we are storing the cartContent
}

export function loadCart(cartContainer) {
  // retrieve items from local storage
  const savedCart = localStorage.getItem("shoppingCart");
  if (savedCart) {
    cartContent = JSON.parse(savedCart);
  }
  
  cartContent.forEach(product => {
    const cartItem = document.createElement("div")
    cartItem.classList.add("cart-item")

    // Create image
    const image = document.createElement("img")
    image.classList.add("image")
    image.src = product.image.url
    image.alt = product.image.alt
    cartItem.appendChild(image)

    //Create product title
    const title = document.createElement("h2")
    title.classList.add("product-title")
    title.textContent = product.title
    cartItem.appendChild(title)

    //Create product price
    const price = document.createElement("p")
    price.classList.add("product-price")
    price.textContent = `$${product.price}`
    cartItem.appendChild(price)

    //Create remove button
    const removeButton = document.createElement("button")
    removeButton.classList.add("remove-button")
    removeButton.textContent = "Remove item"
    cartItem.appendChild(removeButton)

    removeButton.addEventListener("click", function(){ //When Remov Item button is clicked, do this:
      cartContent = cartContent.filter(item => item.id !== product.id) 
      //.filter creates a new array.
      //For every item in the cart =>, check if the id is not equal (!==) to the id of the item that is being removed
      //Keep all items that does not have the same id as the product that is being removed
      saveCart()
      //Save the new cart contents to local storage with the saveCart function
      cartContainer.innerHTML = ""
      //Clear the current cart with the original array of objects
      loadCart(cartContainer)
      //Load the new cart array where the item has been remove, by calling the loadCart function
    })

    cartContainer.appendChild(cartItem)

  });

  if (cartContent.length === 0){
    cartContainer.textContent = "Your cart is empty"
  }

  // create a loop if there are any items to render the container/card for the product
  // add a button to delete the cart item and write function to delete product from cart
}


// add a function to remove all items from the cart
 