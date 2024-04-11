// Function to create product cards
function createProductCards(products) {
  const container = document.getElementById("products");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("product-container", "image-container");
    const image = document.createElement("img");
    image.src = "product_images/" + product.image;
    image.alt = "Product Image";
    imageDiv.appendChild(image);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("product-container", "info-container");
    const name = document.createElement("h4");
    name.textContent = product.name;
    const info = document.createElement("p");
    info.textContent = product.info;
    
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("product-container", "button-container");
    
    // Create a button with an onclick event that redirects to the dynamically generated product page
    const button = document.createElement("button");
    button.textContent = "More Info";
    button.onclick = function() {
      redirectToProductPage(product); // Pass the product data to the function
    };

    infoDiv.appendChild(name);
    infoDiv.appendChild(info);

    buttonDiv.appendChild(button);

    productDiv.appendChild(imageDiv);
    productDiv.appendChild(infoDiv);
    productDiv.appendChild(buttonDiv);

    container.appendChild(productDiv);
  });

  console.log("Loaded products");
}

// Function to redirect to the dynamically generated product page
function redirectToProductPage(product) {
}


function adjustProductCardWidth() {
  const container = document.getElementById('main-content');
  let containerWidth = container.offsetWidth;
  const minCardWidth = 240;
  const spaceBetweenCards = 20; 

  if (containerWidth == 0){
    containerWidth = window.outerWidth - 23;
  }

  const numCardsToFit = Math.floor((containerWidth) / (minCardWidth + 2 * spaceBetweenCards));

  const cardWidth = Math.floor((containerWidth - (2 * spaceBetweenCards * numCardsToFit)) / numCardsToFit);

  const productCards = document.querySelectorAll('.product');
  productCards.forEach(card => {
    card.style.width = cardWidth + 'px';
  });
}


// Fetch JSON data from external file
function loadProductCards() {
  return fetch("content/product_list.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(products => {
      createProductCards(products);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}
  
async function asyncBugFix() { 
  await Promise.all([
    loadProductCards()
  ]);
}

// Call the function when the window is resized or when the page is loaded
window.addEventListener('resize', adjustProductCardWidth);

document.addEventListener("DOMContentLoaded", function() {
  asyncBugFix().then(() => {
    adjustProductCardWidth();
  });
});