function getDishTemplet(category, dishIndex) {
  return `<article class="dish"
  data-id="${ALL_DISHES[category][dishIndex].id}"
  data-category="${category}">
    
    <img src="${ALL_DISHES[category][dishIndex].url}" alt="dish foto" class="dish--img" />
    <section class="dish--info">
        <h4 class="title dish--title">${ALL_DISHES[category][dishIndex].name}</h4>
        <p class="text dish-desc">${ALL_DISHES[category][dishIndex].info}</p>
    </section>
    <section class="dish--right">
        <p class="dish--price price">${ALL_DISHES[category][dishIndex].price}0 €</p>
        <aside class="dish--btns">
            <button class="btn--card add" data-btn="add"></button>
            <p class="text dish--added dnone" id="amount${ALL_DISHES[category][dishIndex].id}">added</p>
            <button class="btn--card bin dnone" id="bin${ALL_DISHES[category][dishIndex].id}" data-btn="bin"></button>
        </aside>
    </section>
</article>`
};

function getBasketItem(dishIndex, category){
    return `<article class="basket--item"
    data-id=${ALL_DISHES[category][dishIndex.id]}>
    <h6 class="title basket--title">${ALL_DISHES[category][dishIndex].name}</h6>
    <section class="wrapper">
        <aside class="dish--btns text">
            <button class="btn btn--minus data-btn="minus"></button>
            <p class="text" id="basket_amount${ALL_DISHES[category][dishIndex].id}">${ALL_DISHES[category][dishIndex].amount}</p>
            <button class="btn btn--plus" data-btn="plus"></button>
        </aside>
        <p class="text price">Function</p>
    </section>
</article>`
}; 
//adding function to calculate the full price