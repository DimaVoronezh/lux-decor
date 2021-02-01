import slider from './modules/_my_functions_/slider';
import ibg from './modules/_my_functions_/ibg';
import catalog from './modules/header/catalog';
import header_bot from './modules/header/transform-header';
import initBurgerMenu from './modules/header/burger_content';
import placeholderInputs from './modules/_my_functions_/placeholder-on-focus';
import burgerMenu from './modules/_my_functions_/burger';
import scrollTo from './modules/_my_functions_/scroll-to';
import showUpArrowByScroll from './modules/show-up-arrow';
import phoneMask from './modules/_my_functions_/phone-mask';
import initBasketText from './modules/header/bascket-init';
import addBuyingProduct from './modules/adding-products-to-bascket/adding-products-to-bascket';
import emailValidation from './modules/_my_functions_/email-validation';
import {
    initBuyingList,
    listenerToDeleteProduct,
    changeQuantityOfProductToBuying
} from './modules/create-product-list-on-order/create-product-list-on-order';
import {
    openResultSearchPage,
    findProductsBySearch
} from './modules/search-result';
import animationLinestAroundItem from './modules/_my_functions_/animation-around-gradient';
import onSubmitForm from './modules/postForm';
import tabs_animated from './modules/_my_functions_/tabs_animated';
import main_slider from './modules/sliders/slider_main';
import goodToKnow_slider from './modules/sliders/good_to_know_slider';
import {
    init_hits_slider,
} from './modules/sliders/hits_slides';
import {
    init_stock_slider
} from './modules/sliders/stock_slider';
import deliver_tabs from './modules/deliver_tabs';
// 
// 
// 
let productsOrder = 'http://localhost:3000/productsOrder';
let products = 'http://localhost:3000/products';
let searching_value = 'http://localhost:3000/searching_value';
let sending_form = 'http://localhost:3000/SendingForm';
// 
window.addEventListener('DOMContentLoaded', () => {
    fetch('../../html_source/header.html').then(header => {
        return header.text();
    }).then(header => {
        return document.querySelector('.header').insertAdjacentHTML('afterbegin', header);
    }).then(() => {
        return fetch('../../html_source/footer.html').then(footer => {
            return footer.text();
        }).then(footer => {
            return document.querySelector('.footer').insertAdjacentHTML('afterbegin', footer);
        });
    }).then(() => {
        // 
        // 
        // 
        // MY INIT
        ibg();
        burgerMenu();
        placeholderInputs();
        scrollTo({
            triggerSel: '._arrow_up',
            speed: 8,
            ableToStopScroll: true
        });
        try {
            phoneMask('.checkout ._phone_mask_valid_');
        } catch (e) { }
        try {
            emailValidation('._email_valid_');
        } catch (e) { }
        // 
        // 
        initBasketText();
        catalog();
        header_bot();
        initBurgerMenu();
        window.addEventListener('resize', initBurgerMenu);
        animationLinestAroundItem('.blog_item_body');
        // 
        showUpArrowByScroll();
        // 
        try {
            addBuyingProduct();
        } catch (e) { }
        // 
        // результат поиска
        openResultSearchPage('.form_search');
        findProductsBySearch('/result_search.html');
        // 
        // инициализация листа выбранных товаров
        initBuyingList();
        listenerToDeleteProduct();
        changeQuantityOfProductToBuying();
        // 
        // отправка формы
        // 
        // табы
        try {
            tabs_animated({
                contentSel: '.tabs_content ._tab_content_',
                triggerSel: '.checkout-who_are_you ._tab_trigger_',
                wrapperlineSel: '._checkout_line_',
                lineSel: '._checkout_line-line_'
            });
        } catch (e) { }
        try {
            deliver_tabs();
        } catch (e) { }
        // 
        // 
        try {
            onSubmitForm('.checkout_form');
        } catch (e) { }
        // 
        // sliders
        main_slider.render();
        goodToKnow_slider.render();
        init_hits_slider();
        init_stock_slider();
        // 
        // 
        // 
    });
});

export {
    productsOrder,
    products,
    searching_value,
    sending_form
};