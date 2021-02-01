import {
    products,
    searching_value
} from "../script";
import ibg from "./_my_functions_/ibg";
import {
    getData,
    putData
} from "./_my_functions_/internet";

function openResultSearchPage(formSelector) {
    let form = document.querySelector(formSelector);
    let input = form.querySelector('input');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let link = form.querySelector('a');
        if (input.value == '' || input.value == ' ' || !input.value.match(/./)) {
            return;
        }
        putData(`${searching_value}/${1}`, {
            value: input.value,
            id: 1
        }).then(data => {
            link.click();
        });
    });
}

function findProductsBySearch(historyPath) {
    if (window.location.pathname != historyPath) {
        return;
    };
    getData(`${searching_value}/${1}`).then(response => {
        if (response.value == '' || response.value == ' ') {
            return;
        }
        return getData(`${products}`).then(products => {
            let reqExp = new RegExp(`${response.value}`, 'gi');
            products.forEach(product => {
                if (product.name.match(reqExp)) {
                    createProductInListBySearch(product);
                };
            });
        }).then(() => {
            ibg();
        });
    }).then(() => {
        checkProductByEndOfSearch('.result_search_row');
    });
}

function checkProductByEndOfSearch(parentSelector) {
    let parent = document.querySelector(parentSelector);
    if (!parent) {
        return;
    }
    let items = parent.children;
    if (items.length != 0) {
        return;
    }
    let item = document.createElement('div');
    item.classList.add('warning_of_null_products');
    item.textContent = `Товаров не найдено по данному запросу! Измените значение поиска`;
    parent.append(item);
}

function createProductInListBySearch({
    name,
    img,
    pricenew,
    priceold,
    happeningWithProduct,
    id
}) {
    let product = document.createElement('div');
    product.classList.add('slider_hits_item');
    product.setAttribute('data-idurl-product', id);
    product.innerHTML = `
                        <div class="slider_hits_item-kvadro">
                            <div class="slider_hits_item-kvadro-text">Хит Продаж</div>
                        </div>
                        <div class="slider_hits_item-img _ibg_"><img src="${img}"
                                alt="">
                        </div>
                        <div class="slider_hits_item-title">${name}</div>
                        <div class="slider_hits_item-price_row">
                            <div class="slider_hits_item-price_old">${priceold}</div>
                            <div class="slider_hits_item-price_new">${pricenew}</div>
                        </div>
                        <a href="#" class="slider_hits_item-link _buy_product">
                            <img src="./img/icons/corzina.svg" alt="">
                            <span>КУПИТЬ</span>
                            <div class="slider_hits_item-link slider_hits_item-link-onHover">
                                <img src="./img/icons/cozinablack.png" alt="">
                                <span>КУПИТЬ</span>
                            </div>
                        </a>
                        <a href="#" class="slider_hits_item-compare">
                            <div class="slider_hits_item-compare-icon"><img src="./img/icons/vesi.png"
                                    alt="">
                            </div>
                            <span>Добавить к сравнению</span>
                        </a>`;
    document.querySelector('.result_search_row').append(product);
}


export {
    openResultSearchPage,
    findProductsBySearch
};