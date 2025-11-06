const endpointUrl = "https://v2.api.noroff.dev/rainy-days"

//Fetching products from the Noroff API and converting it to JSON data
async function fetchAllProducts(){
    try{
        const response = await fetch(endpointUrl)
        const json = await response.json()

        const products = json.data

        console.log(products)
        displayProducts(products)
    }catch(error){
        console.error("Error fetching products", error)
    }
}

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