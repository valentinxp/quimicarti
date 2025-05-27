
let carrito = [];

function guardarCarrito() {
  localStorage.setItem("carritoArtisur", JSON.stringify(carrito));
}

function cargarCarrito() {
  const guardado = localStorage.getItem("carritoArtisur");
  if (guardado) {
    carrito = JSON.parse(guardado);
    actualizarCarrito();
  }
}

function agregarAlCarrito(nombre, precio, imagen = "") {
  const productoExistente = carrito.find(p => p.nombre === nombre);
  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1, imagen });
  }
  mostrarFeedback(nombre);
  actualizarCarrito();
  guardarCarrito();
}

function actualizarCarrito() {
  const contenido = document.querySelector(".cart-content");
  const subtotalElem = document.querySelector(".cart-footer p:nth-of-type(1)");
  const totalElem = document.querySelector(".cart-footer p:nth-of-type(2)");

  contenido.innerHTML = "";
  let subtotal = 0;

  if (carrito.length === 0) {
    contenido.innerHTML = "<p>Tu carrito está vacío.</p>";
  } else {
    carrito.forEach((producto, i) => {
      const item = document.createElement("div");
      item.innerHTML = `
        <div style="display:flex; align-items:center; margin-bottom:10px;">
          <img src="${producto.imagen}" alt="${producto.nombre}" style="width:40px;height:40px;object-fit:cover;border-radius:5px;margin-right:10px;">
          <div style="flex:1">
            <strong>${producto.nombre}</strong><br>
            <button onclick="cambiarCantidad(${i}, -1)" style="width:30px;">-</button>
            <span style="margin: 0 10px;">${producto.cantidad}</span>
            <button onclick="cambiarCantidad(${i}, 1)" style="width:30px;">+</button>
            <span style="float:right;">$${(producto.precio * producto.cantidad).toFixed(2)}
            <button onclick="eliminarProducto(${i})">🗑</button></span>
          </div>
        </div>
      `;
      contenido.appendChild(item);
      subtotal += producto.precio * producto.cantidad;
    });
  }

  subtotalElem.innerHTML = "<strong>Subtotal:</strong> $" + subtotal.toFixed(2);
  totalElem.innerHTML = "<strong>Total:</strong> $" + subtotal.toFixed(2);
}

function cambiarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  actualizarCarrito();
  guardarCarrito();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
  guardarCarrito();
}

// NUEVO: abrir carrito al hacer clic en ícono directamente
document.addEventListener("DOMContentLoaded", () => {
  cargarCarrito();
  const iconoCarrito = document.querySelector(".fa-shopping-cart");
  if (iconoCarrito) {
    iconoCarrito.addEventListener("click", () => {
      document.getElementById("cartPanel").classList.toggle("open");
    });
  }
});

function mostrarFeedback(nombre) {
  const fb = document.getElementById("feedback");
  fb.innerText = `"${nombre}" agregado al carrito ✅`;
  fb.classList.add("show");
  setTimeout(() => fb.classList.remove("show"), 2000);
}

function enviarWhatsApp() {
  if (carrito.length === 0) return;

  let mensaje = "Hola, quiero hacer una compra:%0A";
  let total = 0;

  carrito.forEach(p => {
    const subtotal = p.precio * p.cantidad;
    mensaje += `- ${p.nombre} x${p.cantidad} = $${subtotal.toFixed(2)}%0A`;
    total += subtotal;
  });

  mensaje += `%0ATotal: $${total.toFixed(2)}`;

  const telefono = "5491173632056";
  const url = `https://wa.me/${telefono}?text=${mensaje}`;
  window.open(url, "_blank");
}
