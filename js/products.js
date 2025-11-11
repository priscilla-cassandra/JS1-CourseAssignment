const endpointUrl = "https://v2.api.noroff.dev/rainy-days"

//Fetching products from the Noroff API and converting it to JSON data

let allProducts = [] //Variable outside the function, so it can be accessed anywhere in the script

async function fetchAllProducts(){
    try{
        const response = await fetch(endpointUrl)
        const json = await response.json()

        allProducts = json.data //Assigning products to the global variable

        console.log(allProducts)
        displayProducts(allProducts)
    }catch(error){
        console.error("Error fetching products", error)
    }
}

//Display products and create a div element for each product
function displayProducts(products){
    const productContainer = document.getElementById("product-container")
    productContainer.innerHTML = ""

    products.forEach(product => {
        const productItem = document.createElement("div")
        productItem.classList.add("product")

        //Create anchor tag for each product
        const productLink = document.createElement("a")
        productLink.classList.add("product-link")
        productLink.href = `single-product.html?id=${product.id}`

        productLink.innerHTML = `
  <img src="${product.image.url}" alt="${product.image.alt}">
   <h3>${product.title}</h3>
  <p>Price: $${product.price}</p>
`
        //Create add-to-cart button
        const addToCartButton = document.createElement("button") //Create HTML button element
        addToCartButton.classList.add("add-to-cart-button") //Add a class to the button
        addToCartButton.textContent = "Add to cart" //Set text content

        productItem.appendChild(productLink)
        productItem.appendChild(addToCartButton)
        productContainer.appendChild(productItem)
    
   
    });
}


fetchAllProducts()

//Filtering for gender

const filterForm = document.getElementById("filter-form") //Get filter
const dropdownMenu = document.getElementById("gender-filter") //Get dropdown menu

dropdownMenu.addEventListener("change", () => {
    const selectedValue = dropdownMenu.value;

    let filteredProducts; //Variable to store filtered value

    if(selectedValue === "all"){ //If the selected value is "all"
        filteredProducts = allProducts; //Display all products
    } else if (selectedValue === "female"){ //If the selected value is "female"
        filteredProducts = allProducts.filter(product => {
            return product.gender === "Female" //Display all products with the key gender, and value "Female"
        })
    }else if (selectedValue === "male"){ //If the selected value is "male"
        filteredProducts = allProducts.filter(product => {
            return product.gender === "Male" //Display all products with the gender key and "Male" value
    })
}
displayProducts(filteredProducts) //Calling the displayProducts function to display filtered products based on the users choice
})







