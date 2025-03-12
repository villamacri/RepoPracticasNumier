// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Obtener referencias a los elementos del carrito
  const cartIcon = document.getElementById("cart-icon");
  const carritoSidebar = document.getElementById("carrito-sidebar");
  const carritoButtons = document.getElementById("carrito-buttons");

  // Evento: Abrir o cerrar el carrito al hacer clic en el icono del carrito
  cartIcon.addEventListener("click", () => {
    carritoSidebar.classList.toggle("open");
  });

  // Cargar logo y nombre del negocio desde la API
  axios
    .get("https://www.numier.com/kiosco/api/business?name=sevillafcespt00101")
    .then((response) => {
      const { logo, nameShow } = response.data.data;

      // Insertar logo y nombre en el DOM
      document.getElementById("logo").src = logo;
      document.getElementById("nameShow").textContent = nameShow;
    });

  // Cargar productos desde la API
  axios
    .get(
      "https://www.numier.com/kiosco/api/product?idBusinessInfo=262&lang=es&idParentCategory=0&catalog=R&typeProject=PEDIDOS"
    )
    .then((response) => {
      const data = response.data.data;
      const content = data.content; // Array de categorías con productos

      const productContainer = document.getElementById("product-container");
      const categoryLinksContainer = document.getElementById("category-links");

      // Iterar sobre cada categoría de productos
      content.forEach((category) => {
        // Crear enlace de navegación para la categoría
        const categoryLink = document.createElement("a");
        categoryLink.href = `#category-${category.idCategoria}`;
        categoryLink.textContent = category.name;
        categoryLinksContainer.appendChild(categoryLink);

        // Crear contenedor de la categoría
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category-container");
        categoryDiv.id = `category-${category.idCategoria}`;
        categoryDiv.innerHTML = `<h2>${category.name}</h2>`;

        // Crear lista de productos dentro de la categoría
        const productList = document.createElement("div");
        productList.classList.add("product-list");

        // Iterar sobre cada producto de la categoría
        category.products.forEach((product) => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");

          // Evento: Agregar producto al carrito al hacer clic en él
          productDiv.onclick = () => {
            console.log("Producto clickeado:", product);
            agregarAlCarrito(product);
          };

          // Contenido HTML del producto (nombre, descripción, precios)
          productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description || "Sin descripción"}</p>
            <ul>
              ${product.rates
                .map(
                  (rate) =>
                    `<li>${rate.nameprice} ${rate.price.toFixed(2)}€</li>`
                )
                .join("")}
            </ul>
          `;

          // Si el producto tiene imagen, se agrega
          if (product.image) {
            const img = document.createElement("img");
            img.src = product.image;
            img.alt = product.name;
            productDiv.prepend(img); // Añadir imagen al inicio
          }

          // Agregar el producto a la lista de productos
          productList.appendChild(productDiv);
        });

        // Agregar la lista de productos al contenedor de la categoría
        categoryDiv.appendChild(productList);

        // Agregar el contenedor de categoría al DOM principal
        productContainer.appendChild(categoryDiv);
      });
    })
    .catch((error) => {
      console.error("Error al obtener los datos", error);
    });
});

// ===============================
//        LÓGICA DEL CARRITO
// ===============================

// Inicialización del carrito desde localStorage o vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/**
 * Agrega un producto al carrito de compras.
 * @param {Object} producto - Objeto del producto que se va a agregar.
 */
function agregarAlCarrito(producto) {
  console.log("Producto clickeado:", producto);

  // Buscar si el producto ya existe en el carrito
  let existe = carrito.find((item) => item.id === producto.id);

  if (existe) {
    existe.cantidad++;
  } else {
    // Se asegura que el producto tenga precio, si no, usa 0
    const precio =
      producto.rates && producto.rates[0] && producto.rates[0].price
        ? producto.rates[0].price
        : 0;

    carrito.push({
      id: producto.id,
      name: producto.name,
      image: producto.image || "",
      cantidad: 1,
      precio: precio,
    });
  }

  actualizarCarrito();
}

/**
 * Actualiza la vista del carrito en el sidebar y guarda el estado en localStorage.
 */
function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));

  const sidebar = document.getElementById("carrito-content");
  sidebar.innerHTML = ""; // Limpiar el contenido anterior
  let total = 0;

  // Recorrer cada producto en el carrito para mostrarlo
  carrito.forEach((producto, index) => {
    total += (producto.precio || 0) * producto.cantidad;

    sidebar.innerHTML += `
      <div class="carrito-item">
        <img src="${producto.image || "default-image.jpg"}" alt="${producto.name}">
        <h4>${producto.name}</h4>
        <p>${(producto.precio || 0).toFixed(2)} €</p>
        <input type="number" value="${producto.cantidad}" min="1" onchange="cambiarCantidad(${index}, this.value)">
        <button onclick="eliminarDelCarrito(${index})">❌</button>
      </div>
    `;
  });

  // Mostrar el total y los botones de acción
  sidebar.innerHTML += `<h3>Total: ${(total || 0).toFixed(2)} €</h3>`;
  sidebar.innerHTML += `
    <div class="carrito-buttons" id="carrito-buttons">
      <button onclick="vaciarCarrito()">Cancelar</button>
      <button onclick="confirmarCompra()">Confirmar</button>
    </div>
  `;
}

/**
 * Cambia la cantidad de un producto en el carrito.
 * @param {number} index - Índice del producto en el carrito.
 * @param {number} nuevaCantidad - Nueva cantidad asignada.
 */
function cambiarCantidad(index, nuevaCantidad) {
  carrito[index].cantidad = parseInt(nuevaCantidad);
  actualizarCarrito();
}

/**
 * Elimina un producto del carrito.
 * @param {number} index - Índice del producto a eliminar.
 */
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

/**
 * Vacía todo el carrito.
 */
function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

/**
 * Confirma la compra actual y vacía el carrito.
 */
function confirmarCompra() {
  alert("¡Compra confirmada!");
  vaciarCarrito();
}