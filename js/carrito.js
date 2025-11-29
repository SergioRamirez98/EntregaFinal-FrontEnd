const lista = document.querySelector("#listaCarrito");
const btnVaciar = document.querySelector("#vaciarCarrito");


function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    
    if (carrito.length === 0) {
        lista.innerHTML = "<p>Esto parece un desierto...</p>";
        return;
    }

    
    let html = "";

    carrito.forEach(item => {
        html += `
            <li class="item-carrito">
                <img src="${item.imagen}" width="100" alt="${item.titulo}">
                <div>
                    <h3>${item.titulo}</h3>
                    <p>Precio: $${item.precio}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                    <p>Total: $${item.cantidad * item.precio}</p>
                </div>
            </li>
        `;
    });

    lista.innerHTML = html;
}


document.addEventListener("DOMContentLoaded", mostrarCarrito);


btnVaciar.addEventListener("click", function () {
    localStorage.removeItem("carrito"); 
    mostrarCarrito(); 
});
