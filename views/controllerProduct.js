document.getElementById("productForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const productName = document.getElementById("productName").value;
  const productDescription = document.getElementById("productDescription").value;
  const productPrice = document.getElementById("productPrice").value;
  const productImageInput = document.getElementById("productImage");

  if (!productImageInput.files || !productImageInput.files[0]) {
    alert("Seleccione una imagen para el producto.");
    return;
  }

  const productImage = URL.createObjectURL(productImageInput.files[0]);

  const cardHtml = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img class="card-img-top" src="${productImage}" alt="Product Image">
          <div class="card-body">
            <h5 class="card-title">${productName}</h5>
            <p class="card-text">${productDescription}</p>
            <p class="card-text">${productPrice} USD</p>
            <button class="btn btn-danger btn-sm mr-2" onclick="deleteCard(this)">Eliminar</button>
            <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#updateProductModal" onclick="prepareUpdate(this)">Actualizar</button>
          </div>
        </div>
      </div>
    `;

  const productContainer = document.getElementById("productContainer");
  productContainer.insertAdjacentHTML("beforeend", cardHtml);

  document.getElementById("productForm").reset();

  showNotification();

  $("#addProductModal").modal("hide");
});

function showNotification() {
  Swal.fire({
      title: "¡Producto Agregado!",
      text: "Se ha agregado",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
  });
}

function deleteCard(button) {
  const card = button.closest(".card");
  const row = card.parentElement;
  $("#deleteConfirmationModal").modal("show");

  document.getElementById("deleteConfirmationYesBtn").addEventListener("click", function () {
    card.remove();
    if (row.querySelectorAll(".card").length === 0) {
      row.remove();
    }
    showNotificationDelete();
    $("#deleteConfirmationModal").modal("hide");
  });
}

function showNotificationDelete() {
  Swal.fire({
      title: "¡Producto Eleminado!",
      text: "Se ha eliminado",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
  });
}

let cardBeingUpdated = null;

function prepareUpdate(button) {
  cardBeingUpdated = button.closest(".card");
  const productName = cardBeingUpdated.querySelector(".card-title").textContent;
  const productDescription = cardBeingUpdated.querySelector(".card-text:nth-of-type(1)").textContent;
  const productPrice = parseFloat(cardBeingUpdated.querySelector(".card-text:nth-of-type(2)").textContent);
  const updateProductNameInput = document.getElementById("updateProductName");
  const updateProductDescriptionInput = document.getElementById("updateProductDescription");
  const updateProductPriceInput = document.getElementById("updateProductPrice");

  updateProductNameInput.value = productName;
  updateProductDescriptionInput.value = productDescription;
  updateProductPriceInput.value = productPrice;
}

document.getElementById("updateProductForm").addEventListener("submit", function (event) {
  event.preventDefault();

  if (!cardBeingUpdated) {
    return;
  }

  const updateProductName = document.getElementById("updateProductName").value;
  const updateProductDescription = document.getElementById("updateProductDescription").value;
  const updateProductPrice = document.getElementById("updateProductPrice").value;
  const updateProductImageInput = document.getElementById("updateProductImage");

  if (!updateProductImageInput.files || !updateProductImageInput.files[0]) {
    alert("Seleccione una imagen para el producto.");
    return;
  }

  const updateProductImage = URL.createObjectURL(updateProductImageInput.files[0]);

  const updatedCardHtml = `
      <div class="card">
        <img class="card-img-top" src="${updateProductImage}" alt="Product Image">
        <div class="card-body">
          <h5 class="card-title">${updateProductName}</h5>
          <p class="card-text">${updateProductDescription}</p>
          <p class="card-text">${updateProductPrice} USD</p>
          <button class="btn btn-danger btn-sm mr-2" onclick="deleteCard(this)">Eliminar</button>
          <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#updateProductModal" onclick="prepareUpdate(this)">Actualizar</button>
        </div>
      </div>
    `;

  cardBeingUpdated.outerHTML = updatedCardHtml;
  showNotificationUpdate();

  $("#updateProductModal").modal("hide");
});

function showNotificationUpdate() {
  Swal.fire({
    title: "¡Producto Actualizado!",
    text: "Se ha actualizado",
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
}

document.getElementById("exitButton").addEventListener("click", function () {
  $("#exitConfirmationModal").modal("show");
});