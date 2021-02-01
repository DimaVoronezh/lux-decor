import {
    getData,
    putData,
    deleteData
} from '../_my_functions_/internet';
import {
    productsOrder,
} from '../../script';
import ibg from '../_my_functions_/ibg';
import initBasketText from '../header/bascket-init';

function initBuyingList() {
    if (!document.querySelector('.products_ordering_row')) {
        return;
    }
    let placeForList = document.querySelector('.products_ordering_row');
    getData(productsOrder).then(data => {
        data.forEach(item => {
            placeForList.append(createProductItemInList(item));
        });
        return data;
    }).then(data => {
        animationOnCreatingItem(placeForList);
        calcTotalSum();
        ibg();
        initHeightProductInBascketListToAnimation();
    });
}

function createProductItemInList({
    name,
    img,
    pricenew,
    priceold,
    quantity,
    id
}) {
    let newItem = document.createElement('div');
    newItem.classList.add('product_item');
    newItem.setAttribute(`data-product-idurl`, id);
    newItem.innerHTML = `
                        <div class="product_item_remove">
                            <div class="product_item_remove_img">
                                <img src="./img/icons/delete_product.png" alt="">
                            </div>
                        </div>
                        <div class="product_item_product">
                            <div class="product_item_product_ibg _ibg_">
                                <img src="${img}" alt="">
                            </div>
                            <div class="product_item_product_name">${name}</div>
                        </div>
                        <div class="product_item_prices">
                            <div class="product_item_prices_old">
                                <span>${priceold}</span>
                            </div>
                            <div class="product_item_prices_new">${pricenew}</div>
                        </div>
                        <div class="product_item_change_quantity">
                            <div class="product_item_change_quantity_minus"></div>
                            <div class="product_item_change_quantity_quantity">${quantity}</div>
                            <div class="product_item_change_quantity_plus"></div>
                        </div>
                        <div class="product_item_total">${parseFloat(pricenew) * quantity} грн.</div>
                        `;
    return newItem;
}

function animationOnCreatingItem(parentItem) {
    let computedHeightParent = window.getComputedStyle(parentItem).height;
    let items = parentItem.children;
    if (items.length == 0) {
        return;
    }
    let computedHeightItem = window.getComputedStyle(items[0]).height;
    parentItem.style.maxHeight = '0px';
    let interval = 0;
    for (let i = 0; i < items.length; i++) {
        setTimeout(() => {
            items[i].style.maxHeight = computedHeightItem;
        }, 1);
        setTimeout(() => {
            items[i].classList.add('animationOnCreatingItem');
        }, interval);
        interval += 500;
    }
    setTimeout(() => {
        parentItem.style.transition = `${items.length * 500}ms all ease`;
        parentItem.style.maxHeight = computedHeightParent;
    }, 1);

}

function calcTotalSum() {
    let items = document.querySelector('.products_ordering_row').children;
    let placeForSum = document.querySelector('.products_ordering_total-price');
    let totalSum = 0;
    for (let i = 0; i < items.length; i++) {
        totalSum += parseFloat(items[i].querySelector('.product_item_total').textContent);
    }
    placeForSum.textContent = `${totalSum} грн.`;
}

function calcTotalSumInProduct(item) {
    let placeForSum = item.querySelector('.product_item_total');
    let price = parseFloat(item.querySelector('.product_item_prices_new').textContent);
    let quantity = item.querySelector('.product_item_change_quantity_quantity').textContent;
    placeForSum.textContent = price * quantity + ' грн.';
}

function listenerToDeleteProduct() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('product_item_remove_img')) {
            let item = e.target.closest('.product_item');
            deleteProductFromBascket(item);
        }
    });
}

function deleteProductFromBascket(item) {
    let idToDelete = item.getAttribute('data-product-idurl');
    deleteData(`${productsOrder}/${idToDelete}`).then(data => {
        item.style.maxHeight = '0px';
        item.style.marginTop = '0px';
    }).then(() => {
        setTimeout(() => {
            item.remove();
            calcTotalSum();
            initBasketText();
        }, 1000);
    }).catch(e => {
        alert('Повторите немного позже, сервер временно недоступен');
    });
}

function initHeightProductInBascketListToAnimation() {
    let items = document.querySelectorAll('.product_item');
    items.forEach(item => {
        item.style.maxHeight = window.getComputedStyle(item).height;
    });
}

function changeQuantityOfProductToBuying() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('product_item_change_quantity_plus') ||
            e.target.classList.contains('product_item_change_quantity_minus')) {
            let item = e.target.closest('.product_item');

            if (e.target.classList.contains('product_item_change_quantity_plus')) {
                changeQuantity(item, true);
            } else {
                changeQuantity(item);
            }
        }
    });

    function changeQuantity(item, plus) {
        let quantityOfProduct = item.querySelector('.product_item_change_quantity_quantity');
        let idToUpdate = item.getAttribute('data-product-idurl');

        getData(`${productsOrder}/${idToUpdate}`).then(data => {
            putData(`${productsOrder}/${idToUpdate}`, {
                ...data,
                quantity: plus ? ++data.quantity : --data.quantity
            }).then(response => {
                if (response.quantity < 0) {
                    putData(`${productsOrder}/${idToUpdate}`, {
                        ...data,
                        quantity: 0
                    });
                    return;
                }
                if (response.quantity == 0) {
                    let answer = confirm('Удалить этот лот?');
                    if (answer) {
                        deleteData(`${productsOrder}/${idToUpdate}`).then(data => {
                            item.style.maxHeight = '0px';
                            item.style.marginTop = '0px';
                        }).then(() => {
                            setTimeout(() => {
                                item.remove();
                                initBasketText();
                            }, 3000);
                        }).catch(e => {
                            alert('Сервер временно недоступен put');
                        });
                    } else {
                        putData(`${productsOrder}/${idToUpdate}`, {
                            ...data,
                            quantity: 0
                        }).then(r => {
                            console.log(r);
                        });
                    };
                };
                quantityOfProduct.textContent = response.quantity;
                calcTotalSumInProduct(item);
            }).then(data => {
                calcTotalSum();
            }).catch(e => {
                alert('Сервер временно недоступен put');
            });
        }).catch(e => {
            alert('Сервер временно недоступен get');
        });
    }
}

export {
    initBuyingList,
    listenerToDeleteProduct,
    changeQuantityOfProductToBuying,
    calcTotalSum,
    deleteProductFromBascket,
    animationOnCreatingItem
};