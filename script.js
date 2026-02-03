let dishesRef = document.getElementById("dishes");

function init() {
  renderCategorys();
}

function renderCategorys() {
  let categorys = Object.keys(ALL_DISHES);
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
      if (btn == "add") {
        ALL_DISHES[dishCategory][dishIndex].amount++;
        renderAmount(dishIndex, dishId, dishCategory);
      } else if (btn == "minus") {
        if (ALL_DISHES[dishCategory][dishIndex].amount > 0) {
          ALL_DISHES[dishCategory][dishIndex].amount--;
        } else {
          ALL_DISHES[dishCategory][dishIndex].amount = 0;
        }
        renderAmount(dishIndex, dishId, dishCategory);
      } else if (btn == "bin") {
        ALL_DISHES[dishCategory][dishIndex].amount = 0;
        renderAmount(dishIndex, dishId, dishCategory);
      }
    }
  }
}

// display amount
function renderAmount(dishIndex, dishId, dishCategory) {
  let amountRef = document.getElementById("amount" + dishId);
  let binRef = document.getElementById("bin" + dishId);
  amountRef.innerHTML = "";
  if (ALL_DISHES[dishCategory][dishIndex].amount <= 0) {
    amountRef.classList.add("dnone");
    binRef.classList.add("dnone");
    amountRef.innerHTML = "added: " + ALL_DISHES[dishCategory][dishIndex].amount;
  } else if (ALL_DISHES[dishCategory][dishIndex].amount > 0) {
    amountRef.classList.remove("dnone");
    binRef.classList.remove("dnone");
    amountRef.innerHTML = "added: " + ALL_DISHES[dishCategory][dishIndex].amount;
  }
}

dishesRef.addEventListener("click", (element) => {
  const obj = element.target.closest(".dish");
  const dishId = obj.dataset.id;
  const dishCategory = obj.dataset.category;
  const dataSet = element.target.dataset.btn;
  
  if (dataSet == "add") {
    renderBasketItem(dishId, dishCategory);
    counting(dishId, dishCategory, dataSet);
  }
  if (dataSet == "bin") {
    counting(dishId, dishCategory, dataSet);
  }
});

function renderBasketItem(dishID, dishCategory) {
  let basketRef = document.getElementById("basket_items");
  for (let dishIndex = 0; dishIndex < ALL_DISHES[dishCategory].length; dishIndex++) {
    if (ALL_DISHES[dishCategory][dishIndex].id == dishID) {
      if (ALL_DISHES[dishCategory][dishIndex].amount == 0) {
        basketRef.innerHTML += getBasketItem(dishIndex, dishCategory);
      }
      console.log("test log");
    }
  }
}
//basket countup
//basket countDown
//basket delet
//basket local storage?
