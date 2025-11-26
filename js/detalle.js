const queryString =location.search;
const stringJS= new URLSearchParams(queryString);
const id= stringJS.get("id");

const title = document.querySelector("#prod-title");
const img = document.querySelector("#prod-img");
const desc = document.querySelector("#prod-description");
const price = document.querySelector("#prod-price");
const buyBtn = document.querySelector("#buy-btn");
const prodSize = document.querySelector("#prod-size");
const prodLongDesc = document.querySelector("#prod-longdesc");
const reviewsBox = document.querySelector("#Opinion");


fetch(`https://dummyjson.com/products/${id}`)
  .then(res => res.json())
  .then(data => {

    title.textContent = data.title;
    img.src = data.thumbnail;
    img.alt = data.title;
    desc.textContent = data.description 
    price.textContent = `$${data.price}`;
    buyBtn.href = `./carrito.html?id=${data.id}`; // Enlace para comprar
    prodLongDesc.textContent = data.description; 
    let reviewsHTML = "";
    data.reviews.forEach(review => {
      reviewsHTML += `
        <div class="comment">
          <h4>${review.reviewerName}</h4>
          <p>${review.comment}</p>
          <h5>${new Date(review.date).toLocaleDateString()}</h5>
        </div>
      `;
    });
    reviewsBox.innerHTML = reviewsHTML; 
  })
  .catch(err => console.log("Error:", err));
