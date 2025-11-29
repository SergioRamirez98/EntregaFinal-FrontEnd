const ProductosContainer = document.querySelector(".productos");
const ResenasContainer = document.querySelector(".resenas-grid")


fetch('https://dummyjson.com/products')

    .then((response) => response.json())

    .then((data) => {

         const productosComestibles = data.products.filter(prod => 
            prod.tags.includes("fruits") ||
            prod.tags.includes("vegetables") ||
            prod.tags.includes("meat") ||
            prod.tags.includes("condiments")
        );
           const products = productosComestibles.slice(0, 6);


        let ProductosHTML = "";
        for (let i = 0; i < products.length; i++) {
            const prod = products[i];

            ProductosHTML +=
                `
             <div class="producto">
           <article>
                    <span>${prod.title}</span> 

                    <img src="${prod.thumbnail}" alt="${prod.title}">

                    <p>${prod.description.slice(0, 30)} </p>

                    <h3>${prod.price}</h3>

                <div class="Tarjeta">
                    <a href="./detalle.html?id=${prod.id}" class="info">Más info</a>

                    <button onclick="agregarAlCarrito(${prod.id}, '${prod.title}', ${prod.price}, '${prod.thumbnail}')">
                            Añadir al carrito
                    </button>

                   
                </div>
                
                </article>
            </div>
            `
        }
        ProductosContainer.innerHTML = ProductosHTML



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
        ResenasContainer.innerHTML = comentariosHTML;
    })

    .catch((error) => console.log(error))


function agregarAlCarrito(id, titulo, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
        alert(`"${titulo}" sumado al carrito. Ahora tienes ${productoExistente.cantidad} en el carrito.`);

    } else {
        carrito.push({ id, titulo, precio, imagen, cantidad: 1 });
        alert(`"${titulo}" agregado al carrito.`);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContadorCarrito();

}


function actualizarContadorCarrito() {


    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let totalProductos = 0;

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].cantidad > 0) {
            totalProductos += 1;
        }
    }
    const carritoLink = document.querySelector("#EnlaceCarrito");
    if (carritoLink) {
        carritoLink.textContent = `Carrito: ${totalProductos}`;
    }


}
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);