import { menuArray } from "/data.js";
let orderArr = [];
let orderContainer = document.querySelector(".order-container");

document.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.className === "add-btn") {
    document.querySelector(".output").textContent = "";
    handleAddBtn(e.target.dataset.id);
  } else if (e.target.className === "remove-btn") {
    handleRemoveBtn(e.target.dataset.id);
  } else if (e.target.id === "complete-order") {
    handlePaymentContainer();
  } else if (e.target.id === "pay-btn") {
    handlePaymentBtn();
  } else if (e.target.id === "close-modal") {
    document.querySelector(".payment-container").classList.add("hidden");
    document.querySelector("body").classList.remove("transparent");
  }
});

function handlePaymentContainer() {
  document.querySelector(".payment-container").classList.remove("hidden");
  document.querySelector("body").classList.add("transparent");
}

function handlePaymentBtn() {
  document.querySelector(".payment-container").classList.add("hidden");
  document.querySelector("body").classList.remove("transparent");
  orderContainer.classList.add("hidden");
  document.querySelector(".output").classList.remove("hidden");
  document.querySelector(".output").textContent =
    "Thanks James, Your Order is on it's way";
  orderArr = [];
}

function handleRemoveBtn(menuId) {
  orderArr = orderArr.filter((order) => {
    return order.id != menuId;
  });

  if (orderArr.length === 0) {
    orderContainer.classList.add("hidden");
  }
  getOrderHtml();
}

function handleAddBtn(menuId) {
  orderContainer.classList.remove("hidden");

  menuArray.forEach((menu) => {
    if (menu.id == menuId) {
      orderArr.push(menu);
    }
  });
  getOrderHtml();
}

function getOrderHtml() {
  let totalPrice = 0;

  let orderHtml = "";
  orderArr.forEach((order) => {
    totalPrice += order.price;
    orderHtml += `
    <div class="order-item">
          <span>${order.name} <button class="remove-btn" data-id="${order.id}">remove</button></span>
          <div class="order-price">${order.price}</div>
        </div>
    `;
  });
  document.querySelector(".order-feed").innerHTML = orderHtml;
  document.querySelector(".total-price").textContent = totalPrice;
}

function getFeedHtml() {
  let feedHtml = "";
  menuArray.forEach((menu) => {
    feedHtml += `
        <div class="menu-item">
        <div class="item-image">${menu.emoji}</div>
        <div class="item-about">
          <h3 class="item-name">${menu.name}</h3>
          <p class="item-ingredients">${menu.ingredients}</p>
          <h4 class="item-price">${menu.price}</h4>
        </div>
        <a href="#your-order" >
        <button class="add-btn"  data-id="${menu.id}">+</button></a>
      </div>
      <div class="horizontal"></div>
        `;
  });
  return feedHtml;
}

function render() {
  document.querySelector(".feed-container").innerHTML = getFeedHtml();
}

render();
