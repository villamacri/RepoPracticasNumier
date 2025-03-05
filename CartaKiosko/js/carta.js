document.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://www.numier.com/kiosco/api/product?idBusinessInfo=262&lang=es&idParentCategory=0&catalog=R&typeProject=PEDIDOS"
    )
    .then((response) => {
      const data = response.data.data;

      // Extraemos las categorías de productos y los subproductos
      const hasAnyImage = data.hasAnyImage;
      const content = data.content.map((category) => ({
        idCategoria: category.idCategoria,
        descripcion: category.descripcion,
        name: category.name,
        orden: category.orden,
        idPadre: category.idPadre,
        nombrePadre: category.nombrePadre,
        products: category.products.map((product) => ({
          id: product.id,
          codeTPV: product.codeTPV,
          description: product.description,
          name: product.name,
          type_product: product.type_product,
          allergens: product.allergens,
          isMenu: product.isMenu,
          baja: product.baja,
          noAvailable: product.noAvailable,
          notShowAlone: product.notShowAlone,
          image: product.image,
          imageComprimida: product.imageComprimida,
          rates: product.rates.map((rate) => ({
            nameprice: rate.nameprice,
            price: rate.price,
          })),
          isFeatured: product.isFeatured,
          bases: product.bases,
          extras: product.extras,
          opcionales: product.opcionales,
          menuProducts: product.menuProducts,
          pizzaMitades: product.pizzaMitades,
          nameCategory: product.nameCategory,
          tieneSubProduct: product.tieneSubProduct,
          maxExtras: product.maxExtras,
          minExtra: product.minExtra,
          maxOpcionales: product.maxOpcionales,
          opciones: product.opciones,
          tieneMitades: product.tieneMitades,
          sumaMitades: product.sumaMitades,
          barCode: product.barCode,
        })),
      }));

      const subproducts = data.subproducts.map((subproduct) => ({
        id: subproduct.id,
        name: subproduct.name,
        codeTPV: subproduct.codeTPV,
        availableInCatalogue: subproduct.availableInCatalogue,
        available: subproduct.available,
      }));

      const productContainer = document.getElementById("product-container");
      const categoryLinksContainer = document.getElementById("category-links");

      // Iteramos sobre las categorías y los productos dentro de cada categoría
      content.forEach((category) => {

        // Crear un enlace para la categoría
        const categoryLink = document.createElement("a");
        categoryLink.href = `#category-${category.idCategoria}`;
        categoryLink.textContent = category.name;
        categoryLinksContainer.appendChild(categoryLink);

        // Crear el div de la categoría
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category-container");
        categoryDiv.id = `category-${category.idCategoria}`; // Asignamos el id único a cada categoría
        categoryDiv.innerHTML = `<h2>${category.name}</h2>`;

        // Crear contenedor de productos para esta categoría
        const productList = document.createElement("div");
        productList.classList.add("product-list");

        // Mostrar los productos de la categoría
        category.products.forEach((product) => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");

          // Insertamos el nombre, descripción y precios del producto
          productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <ul>
                  ${product.rates
                    .map(
                      (rate) =>
                        `<li>${rate.nameprice} ${rate.price.toFixed(2)}€</li>`
                    )
                    .join("")}
              `;

          // Si el producto tiene imagen, la insertamos
          if (product.image) {
            const img = document.createElement("img");
            img.src = product.image;
            img.alt = product.name;
            productDiv.prepend(img); // Insertamos la imagen al principio del div
          }

          // Agregar el producto al contenedor de la lista
          productList.appendChild(productDiv);
        });

        // Agregar la lista de productos a la categoría
        categoryDiv.appendChild(productList);

        // Agregar la categoría al contenedor principal
        productContainer.appendChild(categoryDiv);
      });
    })
    .catch((error) => {
      console.error("Error al obtener los datos", error);
    });
});
