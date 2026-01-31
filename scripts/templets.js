function getDishTemplet(category, dishIndex) {
  return `<article class="dish"
  data-id="${ALL_DISHES[category][dishIndex].id}" data-category="${category}">
    
    <img src="${ALL_DISHES[category][dishIndex].url}" alt="dish foto" class="dish--img" />
    <section class="dish--info">
        <h4 class="title dish--title">${ALL_DISHES[category][dishIndex].name}</h4>
        <p class="text dish-desc">${ALL_DISHES[category][dishIndex].info}</p>
    </section>
    <section class="dish--right">
        <p class="dish--price">${ALL_DISHES[category][dishIndex].price}0 €</p>
        <aside class="dish--btns">
            <button class="add--card" data-btn = "add"></button>
            <p class="text dish--added dnone" id="amount${ALL_DISHES[category][dishIndex].id}">added</p>
        </aside>
    </section>
</article>`;
}
