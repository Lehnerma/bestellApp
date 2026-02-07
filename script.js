let dishesRef = document.getElementById("dishes");
let basketItemsRef = document.getElementById("basket_items");
let subtotalPrice = document.getElementById("subtotal_price");
let deliveryPrice = document.getElementById("delivery_price");
let deliveryFee = 5;
let totalPrice = document.getElementById("total_price");
let orderBtn = document.getElementById("order_btn");
let orderBtnPrice = document.getElementById("order_btn_price");
let DIALOG = document.getElementById("dialog");
let dialogBtn = document.getElementById("dialog_btn");

function init() {
  renderCategorys();
  renderDeliveryPrice();
}

dishesRef.addEventListener("click", (element) => {
  const obj = element.target.closest(".dish");
  const dishIndex = obj.dataset.index;
  const dishId = obj.dataset.id;
  const dishCategory = obj.dataset.category;
  const dataSet = element.target.dataset.btn;

  if (dataSet == "add") {
    renderBasket(dishIndex, dishCategory);
    counting(dishId, dishCategory, dataSet);
  }
  if (dataSet == "bin") {
    counting(dishId, dishCategory, dataSet);
  }
  hideBasekt();
});

basketItemsRef.addEventListener("click", (element) => {
  const basketItem = element.target.closest(".basket--item");
  const dishIndex = basketItem.dataset.index;
  const dishId = basketItem.dataset.id;
  const dishCategory = basketItem.dataset.category;
  const btn = element.target.dataset.btn;
  counting(dishId, dishCategory, btn);
  if (ALL_DISHES[dishCategory][dishIndex].amount <= 0) {
    deletBasketItem(basketItem);
  }
});

orderBtn.addEventListener("click", (element) => {
  DIALOG.showModal();
  reset();
});

DIALOG.addEventListener("click", (element) => {
  if (element.target == DIALOG || element.target == dialogBtn) {
    DIALOG.close();
  }
});

function getCategorys(obj) {
  let categorys = Object.keys(obj);
  return categorys;
}

function renderCategorys() {
  let categorys = getCategorys(ALL_DISHES);
  for (let categoryIndex = 0; categoryIndex < categorys.length; categoryIndex++) {
    if (categorys[categoryIndex] == "starters") {
      let containerRef = document.getElementById(categorys[categoryIndex] + "_container");
      renderDishes(containerRef, categorys[categoryIndex]);
    }
    if (categorys[categoryIndex] == "pasta") {
      let containerRef = document.getElementById(categorys[categoryIndex] + "_container");
      renderDishes(containerRef, categorys[categoryIndex]);
    }
    if (categorys[categoryIndex] == "pizzas") {
      let containerRef = document.getElementById(categorys[categoryIndex] + "_container");
      renderDishes(containerRef, categorys[categoryIndex]);
    }
    if (categorys[categoryIndex] == "desserts") {
      let containerRef = document.getElementById(categorys[categoryIndex] + "_container");
      renderDishes(containerRef, categorys[categoryIndex]);
    }
    if (categorys[categoryIndex] == "drinks") {
      let containerRef = document.getElementById(categorys[categoryIndex] + "_container");
      renderDishes(containerRef, categorys[categoryIndex]);
    }
  }
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
      renderBin(dishIndex, dishId, dishCategory);
      renderBasketBin(dishIndex, dishId, dishCategory);
      renderAmount(dishIndex, dishId, dishCategory);
      renderAmountBasket(dishIndex, dishId, dishCategory);
      renderTotalPrice();
      getTotalAmount()
    }
  }
}

function renderAmount(dishIndex, dishId, dishCategory) {
  let amountRef = document.getElementById("amount" + dishId);
  amountRef.innerHTML = "";
  if (ALL_DISHES[dishCategory][dishIndex].amount <= 0) {
    amountRef.classList.add("dnone");
  } else if (ALL_DISHES[dishCategory][dishIndex].amount > 0) {
    amountRef.classList.remove("dnone");
  }
  amountRef.innerHTML = "added: " + ALL_DISHES[dishCategory][dishIndex].amount;
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
    basketItemsRef.innerHTML += getBasketItemTemplate(dishIndex, category);
  }
}

function renderDishPrice(dishIndex, dishId, dishCategory) {
  let priceRef = document.getElementById("price" + dishId);
  let result = ALL_DISHES[dishCategory][dishIndex].price * ALL_DISHES[dishCategory][dishIndex].amount;
  priceRef.innerHTML = "";
  priceRef.innerHTML = Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(result);
}

function renderDeliveryPrice() {
  deliveryPrice.innerHTML = Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(deliveryFee);
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
  subtotalPrice.innerHTML = Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(subResult);
  let totalResult = Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(subResult + deliveryFee);
  totalPrice.innerHTML = totalResult;
  orderBtnPrice.innerHTML = totalResult;
}

function reset() {
  basketItemsRef.innerHTML = "";
  amountReset();
  renderTotalPrice();
  hideBasekt();
  getTotalAmount()
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
  if (!basketItemsRef.innerHTML) {
    basket.classList.add("dnone");
  } else {
    basket.classList.remove("dnone");
  }
}

function getTotalAmount(){
  let categorys = getCategorys(ALL_DISHES);
  let totalAmount = 0;
  let badgetRef = document.getElementById("badget")
  for (let categoryIndex = 0; categoryIndex < categorys.length; categoryIndex++) {
    for (let dishIndex = 0; dishIndex < ALL_DISHES[categorys[categoryIndex]].length; dishIndex++) {
      totalAmount += ALL_DISHES[categorys[categoryIndex]][dishIndex].amount
    }
  }
  console.log(totalAmount);
  badgetRef.innerText = '';
  badgetRef.innerText = totalAmount;
}