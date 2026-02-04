function getDishTemplet(category, dishIndex) {
  return `
<article class="dish"
  data-id="${ALL_DISHES[category][dishIndex].id}"
  data-index="${dishIndex}"
  data-category="${category}">   
    <img src="${ALL_DISHES[category][dishIndex].url}" alt="dish foto" class="dish--img" />
    <section class="dish--info">
        <h4 class="title dish--title">${ALL_DISHES[category][dishIndex].name}</h4>
        <p class="text dish-desc">${ALL_DISHES[category][dishIndex].info}</p>
    </section>
    <section class="dish--right">
        <p class="dish--price price">${Intl.NumberFormat("de-DE", {style: "currency", currency:"EUR"}).format(ALL_DISHES[category][dishIndex].price)}</p>
        <aside class="dish--btns">
            <button class="btn--card add" data-btn="add"></button>
            <p class="text dish--added dnone" id="amount${ALL_DISHES[category][dishIndex].id}">added</p>
            <button class="btn--card bin dnone" id="bin${ALL_DISHES[category][dishIndex].id}" data-btn="bin"></button>
        </aside>
    </section>
</article>`
};

function getBasketItemTemplate(dishIndex, category){
    return `
<article class="basket--item item"
id="item_${ALL_DISHES[category][dishIndex].id}"
 data-id="${ALL_DISHES[category][dishIndex].id}"
 data-category="${category}"
 data-index="${dishIndex}">  
    <h6 class="title basket--title">${ALL_DISHES[category][dishIndex].name}</h6>
    <section class="wrapper">
        <aside class="dish--btns text">
            <button class="btn bin" id="basket_bin${ALL_DISHES[category][dishIndex].id}" data-btn="minus"></button>
            <p class="text" id="basket_amount${ALL_DISHES[category][dishIndex].id}">${ALL_DISHES[category][dishIndex].amount}</p>
            <button class="btn btn--plus" data-btn="plus"></button>
        </aside>
        <p class="text price" id="price${ALL_DISHES[category][dishIndex].id}">price</p>
    </section>
</article>`
}; 
//adding function to calculate the full price