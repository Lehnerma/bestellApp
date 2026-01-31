let dishesRef = document.getElementById("dishes");

function init() {
  renderCategorys();
}

//render dishes
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

dishesRef.addEventListener("click", (element) => {
  let obj = element.target.closest(".dish");
  let dishId = obj.dataset.id;
  let dishCategory = obj.dataset.category;
  const add = element.target.dataset;

  if (add) {
    countUp(dishId, dishCategory);
  }
});

// count up
function countUp(dishId, dishCategory) {
  for (let dishIndex = 0; dishIndex < ALL_DISHES[dishCategory].length; dishIndex++) {
    if (dishId == ALL_DISHES[dishCategory][dishIndex].id) {
      ALL_DISHES[dishCategory][dishIndex].amount++;
      renderAmount(dishIndex, dishId, dishCategory);
    }
  }
}
//count down
function countDown(dishId, dishCategory) {
  for (let index = 0; index < ALL_DISHES[dishCategory].length; index++) {
    if (dishId == ALL_DISHES[dishCategory][index].id) {
      ALL_DISHES[dishCategory][dishId].amount--;
    }
  }
}
// display amount
function renderAmount(dishIndex, dishId, dishCategory) {
  let amountRef = document.getElementById("amount" + dishId);
  amountRef.innerHTML = "";
  if (ALL_DISHES[dishCategory][dishIndex].amount <= 0) {
    amountRef.classList.add("dnone");
    ALL_DISHES[category][dishIndex].amount = 0;
  } else if (ALL_DISHES[dishCategory][dishIndex].amount > 0) {
    amountRef.classList.remove("dnone");
    amountRef.innerHTML = "added: " + ALL_DISHES[dishCategory][dishIndex].amount;
  }
}
//add basket
// basket countup
//basket countDown
//basket delet
//basket local storage?
//
