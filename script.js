function init(){
    renderCategorys();
}

//render dishes
function renderCategorys(){
    let categorys = Object.keys(ALL_DISHES)
    for (let categoryIndex = 0; categoryIndex < categorys.length; categoryIndex++) {
        console.log(categorys[categoryIndex]);
        renderDishes(categorys[categoryIndex])
    }
}
function renderDishes(category){
    let containerRef = document.getElementById('starters_container')
    for (let dishIndex = 0; dishIndex < ALL_DISHES[category].length; dishIndex++) {
        containerRef.innerHTML += getDishTemplet(category, dishIndex);
    }
}
