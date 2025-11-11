const container = document.getElementById("single-product-container")
const endpointUrl = "https://v2.api.noroff.dev/rainy-days"


async function fetchSingleProduct (){
    try {
        
    } catch (error) {
        
    }
}





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

        const productDiv = document.createElement("div")
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