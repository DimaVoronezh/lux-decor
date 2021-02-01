import {
    getData
} from '../_my_functions_/internet';
import {
    productsOrder
} from '../../script';

function initBasketText() {
    let bascket = document.querySelector('.header_corzina');
    let bascketsText = bascket.querySelector('.header_corzina-text');

    getData(productsOrder).then(data => {
        if (data.length == 0) {
            bascketsText.textContent = `Корзина пуста`;
        } else {
            bascketsText.textContent = `Товаров: ${data.length}`;
        }
    }).catch(e => {
        bascketsText.textContent = `Сервер недоступен`;
    });
}
export default initBasketText;