
const ProductosContainer = document.querySelector(".productos");
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
ResenasContainer.innerHTML =comentariosHTML;
})

    .catch((error) => console.log(error))


    function agregarAlCarrito(id, titulo, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find(item => item.id === id);
    
    // Si el producto ya está en el carrito, aumentamos la cantidad
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        // Si no está, lo agregamos al carrito
        carrito.push({ id, titulo, precio, imagen, cantidad: 1 });
    }

    // Guardamos el carrito en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualizamos el contador del carrito
    actualizarContadorCarrito();

    // Alerta al usuario
    alert(`"${titulo}" agregado al carrito.`);
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    /*const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.querySelector("#CarritoActual").textContent = `Carrito: ${totalProductos}`;*/


const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    
    const carritoLink = document.querySelector("#EnlaceCarrito");
    if (carritoLink) {
        carritoLink.textContent = `Carrito: ${totalProductos}`;
    }


}
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);