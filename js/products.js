document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.getElementById("contenedor");
  function mostrarProductos(products) {
    contenedor.innerHTML = "";

    if (products.length === 0) {
      contenedor.innerHTML = `
        <div class="error-message">
          <h4>No se encontraron productos</h4>
        </div>
      `;
      return;
    }

    const row = document.createElement("div");
    row.classList.add("productos-container");

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product-wrapper");

      productDiv.innerHTML = `
        <div class="product-card" onclick="verProducto(${product.id})">
          <img src="${product.image}" alt="${
        product.name
      }" class="product-image"
               onerror="this.src='https://via.placeholder.com/300x200?text=Sin+Imagen'">
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">${
              product.currency
            } ${product.cost.toLocaleString()}</div>
            <p class="product-description">${product.description}</p>
            <div class="product-stats">
              <span class="sold-count">
                <i class="fas fa-shopping-cart"></i>
                ${product.soldCount} vendidos
              </span>
            </div>
          </div>
        </div>
      `;

      row.appendChild(productDiv);
    });

    contenedor.appendChild(row);
  }

  fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
    .then((res) => res.json())
    .then((data) => {
      mostrarProductos(data.products);
    })
    .catch((error) => {
      console.error("Error al cargar productos:", error);
      contenedor.innerHTML = `<p>Error al cargar productos.</p>`;
    });
});

function verProducto(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}
