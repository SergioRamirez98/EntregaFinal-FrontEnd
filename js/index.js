const ProdcutosContainer = document.querySelector(".productos");
//const ResenasContainer = document.querySelector(".resenas")
const ResenasContainer = document.querySelector(".resenas-grid")


fetch('https://dummyjson.com/products')

    .then((response) => response.json())

    .then((data) => {
        const products = data.products.slice(0,6);


        let ProductosHTML = "";
        for (let i = 0; i < products.length; i++) {
            const prod = products[i];

            ProductosHTML +=
                `
             <div class="producto">
           <article>
                    <span>${prod.title}</span> 

                    <img src="${prod.thumbnail}" alt="${prod.tittle}">

                    <p>${prod.description.slice(0, 30)} </p>

                    <h3>${prod.price}</h3>
                    
                    <a href="./detalle.html" class="info">Más info</a>
            
                    <a href="./carrito.html" class="compra">Comprar</a>

                </article>
            </div>
            `
        }
        ProdcutosContainer.innerHTML = ProductosHTML
        
        
let comentarios = [];
for (let i = 0; i < products.length; i++) {
    const prod = products[i];
    if (prod.reviews) { comentarios = comentarios.concat(prod.reviews); }
}

comentarios = comentarios.slice(0, 4);

let comentariosHTML = "";
for (let i = 0; i < comentarios.length; i++) {
    const Comentario = comentarios[i];
    comentariosHTML +=
        `   
        
         <div class="Recuadro">
            <h4>${Comentario.reviewerName}</h4>
            <p>${Comentario.comment}.</p>
        </div>
        `
        
}
ResenasContainer.innerHTML =comentariosHTML;
})

    .catch((error) => console.log(error))