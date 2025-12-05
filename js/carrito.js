const lista = document.querySelector("#listaCarrito");
const btnVaciar = document.querySelector("#vaciarCarrito");
const totalCompra = document.querySelector("#totalCompra");


function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


    if (carrito.length === 0) {
        lista.innerHTML = "<p>Esto parece un desierto...</p>";
        totalCompra.innerHTML = "Total compra: $0";
        return;
    }


    let html = "";
    let total = 0;

    carrito.forEach(item => {
        const itemTotal = item.cantidad * item.precio;
        total += itemTotal;
        html += `
            <li class="item-carrito">
                <img src="${item.imagen}" width="100" alt="${item.titulo}">
                <div>
                    <h3>${item.titulo}</h3>
                    <p>Precio: $${item.precio}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                    <p>Subtotal: $${itemTotal}</p>
                    
                </div>
                <div class="botonera">
                    

                    
          <button id="sumar-${item.id}" class="btn_Suma"> + </button>
          <button id="restar-${item.id}" class="btn_Resta"> - </button>
          <button id="eliminar-${item.id}" class="btn_Eliminar">Eliminar</button>
                </div>
            </li>
        `;
    });

    lista.innerHTML = html;
    totalCompra.innerHTML = `Total compra: $${total}`; carrito.forEach(item => {

       
        const btnSumar = document.querySelector(`#sumar-${item.id}`);
        if (btnSumar) {
            btnSumar.addEventListener("click", function () {
                item.cantidad++;
                localStorage.setItem("carrito", JSON.stringify(carrito)); 
                mostrarCarrito(); 
            });
        }


        const btnRestar = document.querySelector(`#restar-${item.id}`);
        if (btnRestar) {
            btnRestar.addEventListener("click", function () {
                item.cantidad--;

                if (item.cantidad <= 0) {
                    const index = carrito.indexOf(item);
                    carrito.splice(index, 1);
                }

                localStorage.setItem("carrito", JSON.stringify(carrito));
                mostrarCarrito();
            });
        }

        
        const btnEliminar = document.querySelector(`#eliminar-${item.id}`);
        if (btnEliminar) {
            btnEliminar.addEventListener("click", function () {
                const index = carrito.indexOf(item);
                carrito.splice(index, 1);

                localStorage.setItem("carrito", JSON.stringify(carrito));
                mostrarCarrito();
            });
        }

    });
}




document.addEventListener("DOMContentLoaded", mostrarCarrito);


btnVaciar.addEventListener("click", function () {
    localStorage.removeItem("carrito");
    mostrarCarrito();

}

);