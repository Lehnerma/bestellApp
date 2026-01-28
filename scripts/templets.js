function getDishTemplet(){
    return `
    <div class="dish">
    <img src="./assets/img/pizza-margherita.png" alt="Pizza Margherita" class="dish--img" />
    <aside class="dish--info">
      <h4 class="title dish--title">Pizza Title</h4>
      <p class="text dish--desc">Pizza description</p>
    </aside>
    <aside class="dish--right">
      <p class="dish--price">12,34€</p>
      <div>
        <button class="dnone">-</button>
        <button>add</button>
        <button class="dnone">+</button>
      </div>
    </aside>
  </div>`
}