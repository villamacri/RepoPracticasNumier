//Función para desplegar el menú lateral
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", function () {
      const activeLink = document.querySelector("nav a.active");
      if (activeLink) activeLink.classList.remove("active");
      this.classList.add("active");
    });
  });

  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");
  const columnDcha = document.querySelector(".column-dcha");

  function toggleMenu() {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("visible");
    columnDcha.classList.toggle("darken"); // Agregar clase para oscurecer
  }

  menuToggle.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Submenú 1 (Idioma)
  const submenuIdioma = document.getElementById("submenu-idioma");
  const submenu1 = document.querySelector(".submenu1");

  if (submenuIdioma) {
    submenuIdioma.addEventListener("click", function () {
      submenu1.classList.toggle("open-submenu1");
      const arrow1 = submenuIdioma.querySelector(".arrow1");
      if (arrow1) arrow1.classList.toggle("open-submenu1");
    });
  }

  // Submenú 2 (Otro menú)
  const submenuToggle = document.getElementById("submenu-toggle");
  const submenu2 = document.querySelector(".submenu2");

  if (submenuToggle) {
    submenuToggle.addEventListener("click", function () {
      submenu2.classList.toggle("open-submenu2");
      const arrow2 = submenuToggle.querySelector(".arrow2");
      if (arrow2) arrow2.classList.toggle("open-submenu2");
    });
  }
});


//Función para desplazar la página al principio
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
  document.querySelector(".contenido").scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

//Función para abrir la ventana de alergenos
document.getElementById("abrir-alergenos").addEventListener("click", function(){
  document.getElementById("ventana-intolerancia").style.display = "block";
  document.getElementById("overlay").style.display = "block";
});

//Funciones para cerrar la ventana de alergenos
document.getElementById("x").addEventListener("click", function(){
  document.getElementById("ventana-intolerancia").style.display = "none";
  document.getElementById("overlay").style.display = "none";
});


//Funciones para cerrar la ventana de alergenos al hacer click en el overlay
document.getElementById("overlay").addEventListener("click", function(){
  document.getElementById("ventana-intolerancia").style.display = "none";
  document.getElementById("overlay").style.display = "none";
});

//Función para abrir el buscador
document.getElementById("abrir-buscador").addEventListener("click", function(){
  document.getElementById("ventanaBusqueda").style.display = "block";
  });

//Función para cerrar el buscador
document.getElementById("cerrar-buscador").addEventListener("click", function(){
  document.getElementById("ventanaBusqueda").style.display = "none";
});

// Carrito donde almacenamos los productos
let carrito = [];

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
  // Si hay un carrito guardado en localStorage
  const carritoGuardado = localStorage.getItem("carrito");
  
  if (carritoGuardado) {
    // Convertir el carrito guardado de JSON a objeto JavaScript
    carrito = JSON.parse(carritoGuardado);
  }
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
  // Guardar el carrito en localStorage como una cadena JSON
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para agregar productos al carrito
function agregarAlCarrito(nombreProducto, precio, imagen) {
  let productoExistente = carrito.find(producto => producto.nombre === nombreProducto);

  if (productoExistente) {
    // Si ya existe, aumentamos la cantidad
    productoExistente.cantidad++;
  } else {
    // Si no existe, lo agregamos al carrito con la cantidad inicial de 1
    carrito.push({
      nombre: nombreProducto,
      precio: precio,
      cantidad: 1,
      imagen: imagen
    });
  }

  // Guardar el carrito en localStorage cada vez que se modifica
  guardarCarrito();
  actualizarCarrito();
}

// Función para actualizar la vista del carrito
function actualizarCarrito() {
  const listaCarrito = document.getElementById("listaCarrito");
  const totalElemento = document.getElementById("total");

  listaCarrito.innerHTML = "";  // Limpiar el carrito actual

  let total = 0;

  // Recorrer el carrito y mostrar los productos
  carrito.forEach((producto, index) => {
    let item = document.createElement("li");
    item.classList.add("carrito-item");

    let contenedor = document.createElement("div");
    contenedor.classList.add("carrito-contenedor");

    let imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.classList.add("carrito-imagen");

    let texto = document.createElement("p");
    texto.textContent = `${producto.nombre}: ${producto.precio}€ x ${producto.cantidad}`;

    contenedor.appendChild(imagen);
    contenedor.appendChild(texto);
    item.appendChild(contenedor);

    let btnRestar = document.createElement("button");
    btnRestar.textContent = "-";
    btnRestar.classList.add("btn-restar");
    btnRestar.onclick = () => restarCantidad(index);

    let btnSumar = document.createElement("button");
    btnSumar.textContent = "+";
    btnSumar.classList.add("btn-sumar");
    btnSumar.onclick = () => sumarCantidad(index);

    let botonesCantidad = document.createElement("div");
    botonesCantidad.classList.add("botones-cantidad");
    botonesCantidad.appendChild(btnRestar);
    botonesCantidad.appendChild(btnSumar);
    item.appendChild(botonesCantidad);

    let btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn-eliminar");
    btnEliminar.onclick = () => eliminarDelCarrito(index);

    item.appendChild(btnEliminar);
    listaCarrito.appendChild(item);

    total += producto.precio * producto.cantidad;
  });

  totalElemento.textContent = `${total.toFixed(2)}€`;
}

// Función para sumar la cantidad de un producto
function sumarCantidad(index) {
  carrito[index].cantidad++;
  guardarCarrito();
  actualizarCarrito();
}

// Función para restar la cantidad de un producto
function restarCantidad(index) {
  if (carrito[index].cantidad > 1) {
    carrito[index].cantidad--;
  } else {
    carrito.splice(index, 1);
  }
  guardarCarrito();
  actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

// Función para finalizar la compra
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. No puedes finalizar la compra.");
  } else {
    alert("¡Gracias por tu compra! El pago se procesará pronto.");
    carrito = []; // Limpiar el carrito después de finalizar la compra
    localStorage.removeItem("carrito"); // Eliminar el carrito guardado
    actualizarCarrito();  // Actualizar la vista después de la compra
  }
}

// Cargar el carrito al iniciar la página
document.addEventListener("DOMContentLoaded", function () {
  cargarCarrito();
  actualizarCarrito();
});

// Funciones para abrir y cerrar el modal del carrito
document.getElementById("abrir-carrito").addEventListener("click", function () {
  document.getElementById("modalCarrito").style.display = "block";
});

document.getElementById("cerrar-carrito").addEventListener("click", function () {
  document.getElementById("modalCarrito").style.display = "none";
});

// Botón de finalizar compra
document.getElementById("finalizar-compra").addEventListener("click", function () {
  finalizarCompra();
});