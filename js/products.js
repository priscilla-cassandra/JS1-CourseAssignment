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

      productItem.innerHTML = `
  <img src="${product.image.url}" alt="${product.image.alt}">
   <h3>${product.title}</h3>
  <p>Price: $${product.price}</p>
`;

productContainer.appendChild(productItem)
    });
}

fetchAllProducts()

//Filtering for gender

const filterForm = document.getElementById("filter-form") //Get filter
const dropdownMenu = document.getElementById("gender-filter") //Get dropdown menu

dropdownMenu.addEventListener("change", () => {
    const selectedValue = dropdownMenu.value;

    let filteredProducts;

    if(selectedValue === "all"){
        filteredProducts = allProducts;
    } else if (selectedValue === "female"){
        filteredProducts = allProducts.filter(product => {
            return product.gender === "Female"
        })
    }else if (selectedValue === "male"){
        filteredProducts = allProducts.filter(product => {
            return product.gender === "Male"
    })
}
displayProducts(filteredProducts)
})







