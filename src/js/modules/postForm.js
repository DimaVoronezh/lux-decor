import {
    sending_form
} from '../script';
import initBasketText from './header/bascket-init';
import {
    calcTotalSum,
    deleteProductFromBascket,
    animationOnCreatingItem
} from './create-product-list-on-order/create-product-list-on-order';
import {
    postData
} from './_my_functions_/internet';

function onSubmitForm(formSelector) {
    let forms = document.querySelectorAll(formSelector);

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let formdata = new FormData(form);

            let products_to_buy = document.querySelector('.products_ordering_row').querySelectorAll('.product_item');
            if (products_to_buy.length == 0) {
                showMessageInProductRow('.products_ordering_row', 'Для начала выберите товары!');
                return;
            }

            products_to_buy.forEach((item, i) => {
                let product = {};
                product['idURL'] = item.getAttribute('data-product-idurl');
                product['name'] = item.querySelector('.product_item_product_name').textContent;
                product['currentPrice'] = item.querySelector('.product_item_prices_new').textContent;
                product['oldPrice'] = item.querySelector('.product_item_prices_old span').textContent;
                product['currentPrice'] = item.querySelector('.product_item_change_quantity_quantity').textContent;
                product['totalPricePerProduct'] = item.querySelector('.product_item_total').textContent;
                formdata.append(`продукт№${i+1}`, JSON.stringify(product));
            });
            let data_to_post = Object.fromEntries(formdata.entries());

            postData(sending_form, data_to_post).then((data) => {
                products_to_buy.forEach(item => {
                    deleteProductFromBascket(item);
                });
            }).then((data) => {
                initBasketText();
                calcTotalSum();
                form.reset();
            }).catch(() => {
                showMessageInProductRow('.place_to_message', 'Сервер недоступен! Повторите попытку немного позже, пожалуйста!');
            });
        });
    });
}

function showMessageInProductRow(productParentSelector, messageText) {
    let place_for_products = document.querySelector(productParentSelector);
    if (place_for_products.querySelector('.warning')) {
        return;
    }

    let message = document.createElement('div');
    message.classList.add('warning');
    message.textContent = messageText;

    place_for_products.append(message);
    let height = window.getComputedStyle(message).height;
    place_for_products.style.maxHeight = '0px';
    place_for_products.classList.add('animationOnCreatingItem');
    setTimeout(() => {
        place_for_products.style.maxHeight = height;
    }, 10);

    setTimeout(() => {
        place_for_products.classList.remove('animationOnCreatingItem');
        setTimeout(() => {
            place_for_products.style.maxHeight = '0px';
            setTimeout(() => {
                message.remove();
            }, 1000);
        }, 10);
    }, 3000);
}

export default onSubmitForm;