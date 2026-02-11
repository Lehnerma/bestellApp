const DISHES_REF = document.getElementById("dishes");
const BASKET_ITEMS_REF = document.getElementById("basket_items");
const SUBTOTAL_PRICE = document.getElementById("subtotal_price");
const DELIVERY_PRICE = document.getElementById("delivery_price");
const DELIVERY_FEE = 5;
const TOTAL_PRICE = document.getElementById("total_price");
const ORDER_BTN = document.getElementById("order_btn");
const ORDER_BTN_PRICE = document.getElementById("order_btn_price");
const DIALOG = document.getElementById("dialog");
const DIALOG_BTN = document.getElementById("dialog_btn");

function init() {
  renderCategorys();
  renderDeliveryPrice();
  initEventListeners();
}

function initEventListeners() {
  DISHES_REF.addEventListener("click", handleDishes);
  BASKET_ITEMS_REF.addEventListener("click", handleBasketItems);
  ORDER_BTN.addEventListener("click", handleOrder);
  DIALOG.addEventListener("click", handleCloseDialog);
}

function handleDishes(event) {
  const obj = event.target.closest(".dish");
  if (!obj) return;
  const { index, id, category } = obj.dataset;
  const btn = event.target.dataset.btn;
  if (btn == "add") {
    renderBasket(index, category);
    counting(id, category, btn);
  }
  if (btn == "bin") {
    counting(id, category, btn);
  }
  hideBasekt();
}

function handleBasketItems(event) {
  const basketItem = event.target.closest(".basket--item");
  if (!basketItem) return;
  const { index, id, category } = basketItem.dataset;
  const btn = event.target.dataset.btn;
  counting(id, category, btn);
  if (ALL_DISHES[category][index].amount <= 0) {
    deletBasketItem(basketItem);
  }
}

function handleOrder() {
  if (getTotalAmount()) {
    DIALOG.showModal();
    reset();
  } else {
    alert("Doch keinen Hunger? 🤔");
  }
}

function handleCloseDialog(event) {
  if (event.target == DIALOG || event.target == DIALOG_BTN) {
    DIALOG.close();
    showBasket();
  }
}

function getCategorys(obj) {
  let categorys = Object.keys(obj);
  return categorys;
}

function renderCategorys() {
  let categorys = getCategorys(ALL_DISHES);
  categorys.forEach((category) => {
    let containerRef = document.getElementById(category + "_container");
    renderDishes(containerRef, category);
  });
}

function renderDishes(container, category) {
  for (let dishIndex = 0; dishIndex < ALL_DISHES[category].length; dishIndex++) {
    container.innerHTML += getDishTemplet(category, dishIndex);
  }
}

function counting(dishId, dishCategory, btn) {
  for (let dishIndex = 0; dishIndex < ALL_DISHES[dishCategory].length; dishIndex++) {
    if (dishId == ALL_DISHES[dishCategory][dishIndex].id) {
      if (btn == "add" || btn == "plus") {
        ALL_DISHES[dishCategory][dishIndex].amount++;
        renderDishPrice(dishIndex, dishId, dishCategory);
      } else if (btn == "minus") {
        ALL_DISHES[dishCategory][dishIndex].amount--;
        renderDishPrice(dishIndex, dishId, dishCategory);
      } else if (btn == "bin") {
        const basketRef = document.getElementById("item_" + dishId);
        ALL_DISHES[dishCategory][dishIndex].amount = 0;
        deletBasketItem(basketRef);
      }
      renderTotal()
    }
  }
}

function renderTotal(dishIndex, dishId, dishCategory){
  renderBin(dishIndex, dishId, dishCategory);
  renderBasketBin(dishIndex, dishId, dishCategory);
  renderAmount(dishIndex, dishId, dishCategory);
  renderAmountBasket(dishIndex, dishId, dishCategory);
  renderTotalPrice();
  getTotalAmount();
}

function renderAmount(dishIndex, dishId, dishCategory) {
  let amountRef = document.getElementById("amount" + dishId);
  amountRef.innerHTML = "";
  if (ALL_DISHES[dishCategory][dishIndex].amount <= 0) {
    amountRef.classList.add("dnone");
  } else if (ALL_DISHES[dishCategory][dishIndex].amount > 0) {
    amountRef.classList.remove("dnone");
  }
  amountRef.innerHTML = ALL_DISHES[dishCategory][dishIndex].amount + "x";
}

function renderAmountBasket(dishIndex, dishId, dishCategory) {
  let basketAmountRef = document.getElementById("basket_amount" + dishId);
  if (basketAmountRef) {
    basketAmountRef.innerHTML = "";
    basketAmountRef.innerHTML = ALL_DISHES[dishCategory][dishIndex].amount;
  }
}

function renderBin(dishIndex, dishId, dishCategory) {
  let binRef = document.getElementById("bin" + dishId);
  if (ALL_DISHES[dishCategory][dishIndex].amount <= 0) {
    binRef.classList.add("dnone");
  } else if (ALL_DISHES[dishCategory][dishIndex].amount > 0) {
    binRef.classList.remove("dnone");
  }
}

function renderBasketBin(dishIndex, dishId, dishCategory) {
  let binRef = document.getElementById("basket_bin" + dishId);
  if (ALL_DISHES[dishCategory][dishIndex].amount == 1) {
    binRef.classList.add("bin");
    binRef.classList.remove("btn--minus");
  } else if (ALL_DISHES[dishCategory][dishIndex].amount > 1) {
    binRef.classList.remove("bin");
    binRef.classList.add("btn--minus");
  }
}

function renderBasket(dishIndex, category) {
  if (ALL_DISHES[category][dishIndex].amount == 0) {
    BASKET_ITEMS_REF.innerHTML += getBasketItemTemplate(dishIndex, category);
  }
}

function renderDishPrice(dishIndex, dishId, dishCategory) {
  let priceRef = document.getElementById("price" + dishId);
  let result = ALL_DISHES[dishCategory][dishIndex].price * ALL_DISHES[dishCategory][dishIndex].amount;
  priceRef.innerHTML = "";
  priceRef.innerHTML = Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(result);
}

function renderDeliveryPrice() {
  DELIVERY_PRICE.innerHTML = Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(DELIVERY_FEE);
}

function renderTotalPrice() {
  let subResult = 0;
  let categorys = getCategorys(ALL_DISHES);
  for (let categoryIndex = 0; categoryIndex < categorys.length; categoryIndex++) {
    for (let dishIndex = 0; dishIndex < ALL_DISHES[categorys[categoryIndex]].length; dishIndex++) {
      if (ALL_DISHES[categorys[categoryIndex]][dishIndex].amount >= 1) {
        subResult += ALL_DISHES[categorys[categoryIndex]][dishIndex].amount * ALL_DISHES[categorys[categoryIndex]][dishIndex].price;
      }
    }
  }
  SUBTOTAL_PRICE.innerHTML = Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(subResult);
  let totalResult = Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(subResult + DELIVERY_FEE);
  TOTAL_PRICE.innerHTML = totalResult;
  ORDER_BTN_PRICE.innerHTML = totalResult;
}

function reset() {
  BASKET_ITEMS_REF.innerHTML = "";
  amountReset();
  renderTotalPrice();
  hideBasekt();
  getTotalAmount();
}

function amountReset() {
  let categorys = getCategorys(ALL_DISHES);
  for (let categoryIndex = 0; categoryIndex < categorys.length; categoryIndex++) {
    for (let dishIndex = 0; dishIndex < ALL_DISHES[categorys[categoryIndex]].length; dishIndex++) {
      ALL_DISHES[categorys[categoryIndex]][dishIndex].amount = 0;
      renderBin(dishIndex, ALL_DISHES[categorys[categoryIndex]][dishIndex].id, categorys[categoryIndex]);
      renderAmount(dishIndex, ALL_DISHES[categorys[categoryIndex]][dishIndex].id, categorys[categoryIndex]);
    }
  }
}

function deletBasketItem(dish) {
  dish.remove();
}

function hideBasekt() {
  const basket = document.getElementById("basket");
  if (!BASKET_ITEMS_REF.innerHTML) {
    basket.classList.add("dnone");
  } else {
    basket.classList.remove("dnone");
  }
}

function getTotalAmount() {
  let categorys = getCategorys(ALL_DISHES);
  let totalAmount = 0;
  let badgetRef = document.getElementById("badget");
  for (let categoryIndex = 0; categoryIndex < categorys.length; categoryIndex++) {
    for (let dishIndex = 0; dishIndex < ALL_DISHES[categorys[categoryIndex]].length; dishIndex++) {
      totalAmount += ALL_DISHES[categorys[categoryIndex]][dishIndex].amount;
    }
  }
  badgetRef.innerText = "";
  badgetRef.innerText = totalAmount;
  return totalAmount;
}

function showBasket() {
  let basketRef = document.getElementById("basket");
  basketRef.classList.toggle("sidebar-hidden");
}
