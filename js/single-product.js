const container = document.getElementById("single-product-container")
const endpointUrl = "https://v2.api.noroff.dev/rainy-days"





async function fetchAndCreateProduct(){
    try {
        const params = new URLSearchParams(window.location.search)
        const id = params.get("id")

        if(!id){
            container.textContent = "No ID provided"
            return
        }

        const response = await fetch(`${endpointUrl}/${id}`)
        const data = await response.json()
        const product = data.data
        console.log(product)
        console.log("Product detail:", product)
        console.log("Price:", product.price)
        console.log("Description:", product.description)

        //Create product div
        const productDiv = document.createElement("div")
        productDiv.classList.add("product-details")

        productDiv.innerHTML = `
  <img src="${product.image.url}" alt="${product.image.alt}">
   <h3>${product.title}</h3>
  <p>Price: $${product.price}</p>
  <h3>Description</h3>
  <p>${product.description}</p>
`
        container.appendChild(productDiv)
    } catch (error) {
        console.error("Failed to fetch products", error)
        container.textContent = "Failed to load product"
    }
}

fetchAndCreateProduct()