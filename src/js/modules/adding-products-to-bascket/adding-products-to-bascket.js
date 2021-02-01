import initBasketText from '../header/bascket-init';
import {
    getData,
    postData,
    putData
} from '../_my_functions_/internet';
import {
    productsOrder
} from '../../script';

function addBuyingProduct() {
    let canClick = true;
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('_buy_product')) {
            e.preventDefault();
            e.preventDefault();
            if (!canClick) {
                return;
            }
            canClick = false;
            let productItem = e.target.closest('.slider_hits_item');
            let productName = productItem.querySelector('.slider_hits_item-title').textContent;
            let productImg = productItem.querySelector('.slider_hits_item-img._ibg_ img').src;
            let productPriceNow = productItem.querySelector('.slider_hits_item-price_new').textContent;
            let productPriceOld = productItem.querySelector('.slider_hits_item-price_old').textContent;

            let product = {
                name: productName,
                img: productImg,
                pricenew: productPriceNow,
                priceold: productPriceOld,
                quantity: 1
            }
            let urlID;
            let quantityProduct;

            getData(productsOrder).then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name == product.name) {
                        urlID = data[i].id;
                        quantityProduct = data[i].quantity;
                        return;
                    } else {
                        urlID = '';
                    }
                }
            }).then(data => {
                if (urlID == '' || urlID == undefined) {
                    postData(productsOrder, product).then(data => {
                        initBasketText();
                        animationOnAddingBuyingProduct(productItem, 1500);
                    }).catch(e => {
                        alert('Приносим извинения, временные неполадки, пожалуйста, перезагрузите страницу');
                    });
                } else {
                    putData(`${productsOrder}/${urlID}`, {
                        ...product,
                        quantity: ++quantityProduct
                    }).then(response => {
                        animationOnAddingBuyingProduct(productItem, 1500);
                    }).catch(e => {
                        alert('Повторите попытку немного позже, пожалуйста');
                    });
                }
            }).then(data => {
                canClick = true;
            }).catch(e => {
                changeTextInHrefOnError(item);
            });
        }
    })
}

function changeTextInHrefOnError(elem) {
    let targetsText = elem.querySelectorAll('span');
    targetsText.forEach(item => {
        item.textContent = 'Сервер недоступен';
    });
    setTimeout(() => {
        targetsText.forEach(item => {
            item.textContent = 'Купить';
        });
    }, 3000);
}

function animationOnAddingBuyingProduct(item, transition) {
    let bascket = document.querySelector('.header_corzina');
    let bascketCoords = bascket.getBoundingClientRect();

    let cloneItem = item.cloneNode(true);
    let itemsCoords = item.getBoundingClientRect();
    let widthItem = window.getComputedStyle(item).width;
    let heightItem = window.getComputedStyle(item).height;

    cloneItem.style.position = 'absolute';
    cloneItem.style.transition = `${transition}ms all ease`;
    cloneItem.style.width = widthItem;
    cloneItem.style.height = heightItem;
    cloneItem.style.left = `${itemsCoords.left + pageXOffset}px`;
    cloneItem.style.top = `${itemsCoords.top + pageYOffset}px`;
    document.body.append(cloneItem);
    setTimeout(() => {
        cloneItem.style.top = `-150px`;
        cloneItem.style.left = `${bascketCoords.left - parseInt(widthItem)/2}px`;
        cloneItem.style.transform = 'scale(0)';
        setTimeout(() => {
            cloneItem.remove();
        }, transition);
    }, 10);
}
export default addBuyingProduct;