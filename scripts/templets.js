function getDishTemplet(category, dishIndex) {
  return `<article class="dish">
    <img src="${ALL_DISHES[category][dishIndex].url}" alt="dish foto" class="dish--img" />
    <section class="dish--info">
        <h4 class="title dish--title">${ALL_DISHES[category][dishIndex].name}</h4>
        <p class="text dish-desc">${ALL_DISHES[category][dishIndex].info}</p>
    </section>
    <section class="dish--right">
        <p class="dish--price">${ALL_DISHES[category][dishIndex].price}</p>
        <aside class="dish--btns">
            <p class="text dish--added"></p>
            <button class="add--card"></button>
        </aside>
    </section>
</article>`;
}
