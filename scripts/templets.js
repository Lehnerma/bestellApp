function getDishTemplet() {
  return `
<article class="dish">
    <img src="./assets/img/pizza-margherita.png" alt="Pizza Margherita" class="dish--img" />
    <section class="dish--info">
        <h4 class="title dish--title">Pizza Title</h4>
        <p class="text dish-desc">Pizza description</p>
    </section>
    <section class="dish--right">
        <p class="dish--price">12,34€</p>
        <aside class="dish--btns">
            <p class="text dish--added">added 4</p>
            <button class="add--card"></button>
        </aside>
    </section>
</article>`;
}
