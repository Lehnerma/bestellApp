function init(){
    renderDishes();
}

//render dishes
// function renderDishes(){
//     const categorys = getCategory(ALL_DISHES)
//     for (let dishIndex = 0; dishIndex < categorys.length; dishIndex++) {
//         console.log(categorys[dishIndex]);
//         if (categorys[dishIndex] == "starters"){
            
//         }
//         if (categorys[dishIndex] == "pasta"){

//         }
//         if (categorys[dishIndex] == "pizzas") {

//         }
//         if (categorys[dishIndex] == "desserts"){

//         }
//         if (categorys[dishIndex] == "drinks"){

//         }
//     }
// }
function renderDishes(){
    renderStarter()
}
function renderStarter(){
    let starters = ALL_DISHES.starters;
    let containerRef = document.getElementById("starters_container");
    containerRef = "";
    for (let dishIndex = 0; dishIndex < starters.length; dishIndex++) {
        containerRef = getDishTemplet()
        
    }
}
    //split into categorys - arrays?
function getCategory(object){
return Object.keys(object);
}
    //add data index

// array basket?
//render basket
//push to basket
//delet basket item
