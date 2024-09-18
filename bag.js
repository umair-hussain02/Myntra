

let bagItemObject;
onLoad();
function onLoad(){
    loadBagItemObjects();
    displayBagContent();
    showPriceSummary();
}
function removeFromList(removedItemId){
    bagValue = bagValue.filter(bagItemId => bagItemId != removedItemId);
    localStorage.setItem('bagItem',JSON.stringify(bagValue))
    let selectedItem = document.querySelector('.selected-Item');
    selectedItem.innerText = bagValue.length;
    loadBagItemObjects();
    displayBagContent();
    displayBagIcon();
    showPriceSummary();
}
function loadBagItemObjects(){
    bagItemObject = bagValue.map(itemId =>{
        for(let i =0; i< items.length; i++){
            if (itemId == items[i].id){
                return items[i];
            }
        }
    })
}
function displayBagContent(){
    let itemContainer = document.querySelector(".display-bag-item")
    let innerContent = '';
    bagItemObject.forEach(itemObject => {
        innerContent += generatBagHtml(itemObject);        
    });
    itemContainer.innerHTML = innerContent;
}
function generatBagHtml(item){
        return` 
        <div class="services item-view">
        <img src="${item.image}" alt="">
        <div class="cart-item-detail">
        <p class="brand">${item.company}</p>
        <p class="titel">${item.item_name}</p>
        <p class="seller">Sold by: ELCINO</p>
        <div class="price">
        <div class="current">Rs. ${item.current_price}</div>
        <div class="original">Rs. ${item.original_price}</div>
        <div class="percentage-off">${item.discount_percentage}% OFF</div>
        </div>
        <p class="return-time">14 DAYS RETURN AVAILABLE</p>
        </div>
        <button class="cancel" onclick="removeFromList(${item.id})">X</button>
        </div>
        `
}


function showPriceSummary(){
    let itemCount = bagItemObject.length;
    let totalMrp = 0;
    let discountOnMrp = 0;
    let couponDiscount = 0;
    let platformFee = 49;
    let shippingFee = 99;
    let totalAmount = 0;
    bagItemObject.forEach(item =>{
        totalMrp += item.current_price;
        discountOnMrp += (item.original_price-item.current_price);
    })
    totalAmount = totalMrp-couponDiscount+platformFee+shippingFee;

    let priceSummary = document.querySelector('.price-summary');
    priceSummary.innerHTML =`
                    <div class="price-details">
                        <h2>PRICE DETAILS (${itemCount} Item)</h2>
                        <div class="price-container">
                            <p>Total MRP</p>
                            <p>Rs.${totalMrp}</p>
                        </div>
                        <div class="price-container">
                            <p>Discount on MRP</p>
                            <p>Rs.${discountOnMrp}</p>
                        </div>
                        <div class="price-container">
                            <p>Coupon Discount</p>
                            <p>Rs.${couponDiscount}</p>
                        </div>
                        <div class="price-container">
                            <p>Platform Fee</p>
                            <p>Rs.${platformFee}</p>
                        </div>
                        <div class="price-container">
                            <p>Shipping Fee</p>
                            <p>Rs.${shippingFee}</p>
                        </div>
                    </div>
                    <div class="total-amount">
                        <div>
                            <h2>Total Amount</h2>
                            <h2>Rs.${totalAmount}</h2>
                        </div>
                        <button>PLACE ORDER</button>
                    </div>
    `
}

let selectedItem = document.querySelector('.selected-Item');
selectedItem.innerText = bagValue.length;

