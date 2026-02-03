let dishesRef = document.getElementById("dishes");
let basketItemsRef = document.getElementById("basket_items");

function init() {
  renderCategorys();
}

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
});

function counting(dishId, dishCategory, btn) {
  for (let dishIndex = 0; dishIndex < ALL_DISHES[dishCategory].length; dishIndex++) {
    if (dishId == ALL_DISHES[dishCategory][dishIndex].id) {
      if (btn == "add" || btn == "plus") {
        ALL_DISHES[dishCategory][dishIndex].amount++;
      } else if (btn == "minus"){
        ALL_DISHES[dishCategory][dishIndex].amount--;
      }
      else if (btn == "bin") {
        ALL_DISHES[dishCategory][dishIndex].amount = 0;
      } else {
        return
      }
      renderBin(dishIndex, dishId, dishCategory);
      renderAmount(dishIndex, dishId, dishCategory);
      renderAmountBasket(dishIndex, dishId, dishCategory);
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
  basketAmountRef.innerHTML = '';
  basketAmountRef.innerHTML = ALL_DISHES[dishCategory][dishIndex].amount;
}

function renderBin(dishIndex, dishId, dishCategory) {
  let binRef = document.getElementById("bin" + dishId);
  if (ALL_DISHES[dishCategory][dishIndex].amount <= 0){
    binRef.classList.add("dnone");
  } else if (ALL_DISHES[dishCategory][dishIndex].amount > 0){
    binRef.classList.remove("dnone");
  }
}

function renderBasketBin(dishIndex, dishId, dishCategory) {
  let binRef = document.getElementById("bin" + dishId);
  if (ALL_DISHES[dishCategory][dishIndex].amount <= 0){
    binRef.classList.add("dnone");
  } else if (ALL_DISHES[dishCategory][dishIndex].amount > 0){
    binRef.classList.remove("dnone");
  }
}

function renderBasket(dishIndex, category) {
  if (ALL_DISHES[category][dishIndex].amount == 0) {
    basketItemsRef.innerHTML += getBasketItemTemplate(dishIndex, category);
  }
}

basketItemsRef.addEventListener("click", (element) => {
  const basketItem = element.target.closest(".basket--item");
  const dishIndex = basketItem.dataset.index;
  const dishId = basketItem.dataset.id;
  const dishCategory = basketItem.dataset.category;
  const btn = element.target.dataset.btn;
  console.log(dishIndex);
  
  counting(dishId, dishCategory, btn);
  if (ALL_DISHES[dishCategory][dishIndex].amount <= 0){
    deletItem(basketItem)
  }
})

//basket delet
function deletItem(dish){
  dish.remove()
}
//basket local storage?
