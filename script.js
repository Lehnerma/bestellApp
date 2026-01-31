let dishesRef = document.getElementById('dishes');

function init(){
    renderCategorys();
}

//render dishes
function renderCategorys(){
    let categorys = Object.keys(ALL_DISHES)
    for (let categoryIndex = 0; categoryIndex < categorys.length; categoryIndex++) {
        if (categorys[categoryIndex] == "starters") {
            let containerRef = document.getElementById(categorys[categoryIndex]+"_container")
            
            renderDishes(containerRef, categorys[categoryIndex])
        };
        if (categorys[categoryIndex] == "pasta") {
            let containerRef = document.getElementById(categorys[categoryIndex]+"_container")
            
            renderDishes(containerRef, categorys[categoryIndex])
        };
        if (categorys[categoryIndex] == "pizzas") {
            let containerRef = document.getElementById(categorys[categoryIndex]+"_container")
            
            renderDishes(containerRef, categorys[categoryIndex])
        };
        if (categorys[categoryIndex] == "desserts") {
            let containerRef = document.getElementById(categorys[categoryIndex]+"_container")
            
            renderDishes(containerRef, categorys[categoryIndex])
        };
        if (categorys[categoryIndex] == "drinks") {
            let containerRef = document.getElementById(categorys[categoryIndex]+"_container")
            
            renderDishes(containerRef, categorys[categoryIndex])
        };
    }
}
function renderDishes(container, category){
    for (let dishIndex = 0; dishIndex < ALL_DISHES[category].length; dishIndex++) {
        container.innerHTML += getDishTemplet(category, dishIndex);
    }
}

dishesRef.addEventListener("click", (element) =>{
    let obj = element.target.closest(".dish");
    let dishId = obj.dataset.id;
    let dishCategory = obj.dataset.category;
countUp(dishId, dishCategory)
    
})

// count up
function countUp(dishId, category){
    for (let index = 0; index < ALL_DISHES[category].length; index++) {
        if (dishId == ALL_DISHES[category][index].id) {
            console.log("geschafft + " + index);
            
        }
        
    }
}
//count down

//add basket
// basket countup
//basket countDown
//basket delet
//basket local storage?
//