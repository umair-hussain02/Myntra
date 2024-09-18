let bagValue;
onload();

function onload(){
    let bagItemStr = localStorage.getItem('bagItem');
    bagValue = bagItemStr ? JSON.parse(bagItemStr): [];
    displayContent();
    displayBagIcon();

}

function addToBag(itemId){
    bagValue.push(itemId);
    localStorage.setItem('bagItem',JSON.stringify(bagValue))
    displayBagIcon();
}
function displayBagIcon(){
    let bagItemCount = document.querySelector(".bag-item-count");
    if(bagValue.length > 0){
        bagItemCount.style.visibility = "visible";  
        bagItemCount.innerText = bagValue.length;
    }else{
        bagItemCount.style.visibility = "hidden";
    }
}




function displayContent(){
let productsContainer = document.querySelector(".products");
if (!productsContainer) {
    return;
  }
let innerHtml = '';

items.forEach(items => {
    
    innerHtml +=`
            <div class="cards">
                <div class="images">
                    <div class="rating"><p>${items.rating.stars} 🌟 | ${items.rating.count}</p></div>
                    <img src="${items.image}" alt="">
                </div>
                <div class="card-detail">
                    <h3>${items.company}</h3>
                    <h2>${items.item_name}</h2>
                    <div class="price">
                        <div class="current">Rs. ${items.current_price}</div>
                        <div class="original">Rs. ${items.original_price}</div>
                        <div class="percentage-off">(${items.discount_percentage}% OFF)</div>
                    </div>
                    <button onclick="addToBag(${items.id})">Add to Cart</button>
                </div>
            </div>
    `;
});
productsContainer.innerHTML = innerHtml;
}

