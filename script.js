const productos = {
    base: [
        { marca: "Charlotte Tilbury" , nombre: "Base Flawless Filter", precio: 49.00 },
        { marca: "Charlotte Tilbury", nombre: "Base Airbrush Flawless", precio: 49.00 },
        { marca: "Dior Beauty", nombre: "Base Backstage Face & Body", precio: 45.00 },
        { marca: "Dior Beauty", nombre: "Base Forever Skin Perfect 24H Multi-Use", precio: 57.00 },
        { marca: "Make Up by Mario", nombre: "Base SurrealSkin® Luminous Hydrating", precio: 48.00 },
        { marca: "Patrick Ta", nombre: "Base Major Skin Crème Duo", precio: 52.00 },
        { marca: "Rare Beauty", nombre: "Tinta Positive Light", precio: 30.00 }
    ],
    bronzer: [
        { marca: "Charlotte Tilbury", nombre: "Bronzer en Crema Beautiful Skin Sun-Kissed Glow", precio: 58.00 },
        { marca: "Dior Beauty", nombre: "Bronzer Forever Nude Jumbo", precio: 54.00 },
        { marca: "Make Up by Mario", nombre: "Contorno y Bronzer en Crema SoftSculpt® Shaping Stick®", precio: 34.00 },
        { marca: "Make Up by Mario", nombre: "Bronzer Softsculpt® Multi-Use Shaping Serum", precio: 36.00 },
        { marca: "Rare Beauty", nombre: "Bronzer en Crema Warm Wishes Effortless", precio: 28.00 },
        { marca: "Rare Beauty", nombre: "Bronzer Soft Pinch Liquid", precio: 28.00 }
    ],
    corrector: [
        { marca: "Charlotte Tilbury", nombre: "Corrector Beautiful Skin Medium to Full Coverage", precio: 33.00 },
        { marca: "Dior Beauty", nombre: "Corrector Forever Skin Correct Full-Coverage", precio: 42.00 },
        { marca: "Dior Beauty", nombre: "Corrector Backstage", precio: 33.00 },
        { marca: "Make Up by Mario", nombre: "Corrector SurrealSkin™ Awakening", precio: 29.00 },
        { marca: "Rare Beauty", nombre: "Corrector Líquido Touch Brightening", precio: 24.00 }
    ],
    rubor: [
        { marca: "Charlotte Tilbury", nombre: "Rubor Matte Beauty", precio: 42.00 },
        { marca: "Dior Beauty", nombre: "Rubor en Polvo Rosy Glow", precio: 42.00 },
        { marca: "Make Up by Mario", nombre: "Rubor en Stick Soft Pop Cream", precio: 34.00 },
        { marca: "Make Up by Mario", nombre: "Rubor en Polvo Soft Pop", precio: 32.00 },
        { marca: "Make Up by Mario", nombre: "Rubor en Crema Soft Pop Plumping", precio: 34.00 },
        { marca: "Rare Beauty", nombre: "Rubor Líquido Soft Pinch", precio: 25.00 },
        { marca: "Rare Beauty", nombre: "Rubor en Crema Stay Vulnerable Melting", precio: 24.00 }
    ],
    sombras: [
        { marca: "Charlotte Tilbury", nombre: "Paleta de Sombras Luxury Eyeshadow", precio: 55.00 },
        { marca: "Dior Beauty", nombre: "Paleta de Sombras Diorshow 5 Couleurs Couture", precio: 72.00 },
        { marca: "Make Up by Mario", nombre: "Paleta de Sombras Master Mattes®", precio: 56.00 },
        { marca: "Patrick Ta", nombre: "Paleta de Sombras Major Dimension III Matte", precio: 70.00 },
        { marca: "Patrick Ta", nombre: "Sombras Major Dimension Eye Illusion", precio: 42.00 },
    ]
};

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarVistaCarrito() {
    guardarCarrito();
    mostrarCarrito();
    actualizarContador();
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
    const contador = document.getElementById("contadorCarrito");
    if (contador) {
        let total = 0;
        carrito.forEach(item => total += item.cantidad);
        contador.textContent = total;
    }
}

function agregarProducto(nombre, precio) {
    let encontrado = carrito.find(item => item.nombre === nombre);
    if (encontrado) {
        encontrado.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    
    actualizarVistaCarrito();
    
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `${nombre} añadido al carrito`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    });
}

function mostrarCarrito() {
    const lista = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");

    if (!lista || !totalCarrito) return;

    lista.innerHTML = "";
    let suma = 0;

    carrito.forEach((item, index) => {
        suma += item.precio * item.cantidad;

        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio.toFixed(2)} x ${item.cantidad} `;

        const btnMenos = document.createElement("button");
        btnMenos.textContent = "-";
        btnMenos.className = "btn-carrito-ajuste";
        btnMenos.addEventListener("click", () => eliminarProducto(index));

        const btnMas = document.createElement("button");
        btnMas.textContent = "+";
        btnMas.className = "btn-carrito-ajuste";
        btnMas.addEventListener("click", () => aumentarProducto(index));

        li.appendChild(btnMenos);
        li.appendChild(btnMas);
        lista.appendChild(li);
    });

    totalCarrito.textContent = `Total: $${suma.toFixed(2)}`;
}

function eliminarProducto(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        carrito.splice(index, 1);
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: 'Producto eliminado',
            showConfirmButton: false,
            timer: 1000
        });
    }
    actualizarVistaCarrito();
}

function aumentarProducto(index) {
    carrito[index].cantidad++;
    actualizarVistaCarrito();
}

function vaciarCarrito() {
    if (carrito.length === 0) {
        Swal.fire('Información', 'Tu carrito ya está vacío.', 'info');
        return;
    }
    
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Se eliminarán todos los artículos de tu carrito!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, vaciar carrito',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            actualizarVistaCarrito();
            Swal.fire(
                '¡Vaciado!',
                'Tu carrito ha sido vaciado.',
                'success'
            );
        }
    });
}

function comprar() {
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Carrito Vacío',
            text: 'Debes añadir productos antes de comprar.',
            confirmButtonText: 'Entendido'
        });
    } else {
        carrito = [];
        actualizarVistaCarrito();
        
        Swal.fire({
            icon: 'success',
            title: '¡Compra Exitosa!',
            html: '<h3>¡Gracias por tu compra!</h3><p>Tu pedido será procesado y enviado pronto.</p>',
            confirmButtonText: 'Aceptar'
        });
    }
    
    const mensaje = document.getElementById("mensajeCompra");
    if (mensaje) mensaje.textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarVistaCarrito();

    const btnVaciar = document.getElementById("vaciarCarrito");
    if (btnVaciar) btnVaciar.addEventListener("click", vaciarCarrito);

    const btnComprar = document.getElementById("comprar");
    if (btnComprar) btnComprar.addEventListener("click", comprar);

    const botones = document.querySelectorAll(".agregarProductoCarrito");
    botones.forEach(btn => {
        btn.addEventListener("click", e => {
            const item = e.target.closest(".item");
            if (!item) return;

            const nombreElem = item.querySelector(".nombre");
            const precioElem = item.querySelector(".precio");
            if (!nombreElem || !precioElem) return;

            const nombre = nombreElem.textContent.trim();
            const precio = parseFloat(precioElem.textContent.replace("$", "").trim());
            agregarProducto(nombre, precio);
        });
    });
});