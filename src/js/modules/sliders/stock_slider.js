import ibg from "../_my_functions_/ibg";
import {
    getData
} from "../_my_functions_/internet";
import Slider from "../_my_functions_/slider";
import create_slider_item from "./create_slider_item";
import put_slider_item_to from "./put_slider_item_to";

let stocks_slider = new Slider({
    sliderSelector: '.stock-section .slider_stocks',
    arrows: true,
    sliderArrowLeft: '.slider_stocks .arrow_left',
    sliderArrowRight: '.slider_stocks .arrow_right',
    dots: false,
    scrollByMouse: false,
    dragByMouse: false,
    scrollByTouch: true,
    dragByTouch: true,
    distanceToScrollToSwipe: 150,
    transitionDuration: 800,
    transitionProperty: 'ease-in-out',
    adaptiveHeight: false,
    autoPlay: false,
    autoPlayingInterval: 2000,
    waitForAnimation: false,
    slidesToShow: 4,
    mediaRequstes: {
        '1050px': {
            slidesToShow: 3,
            swipeSlidesCount: 2
        },
        '700px': {
            slidesToShow: 2,
            swipeSlidesCount: 2
        },
        '450px': {
            slidesToShow: 1,
            swipeSlidesCount: 1
        }
    },
    swipeSlidesCount: 1
});

function init_stock_slider() {
    if (!document.querySelector('.slider_stocks_inner')) {
        return;
    }
    getData('http://localhost:3000/products').then(data => {
        return data.forEach(item => {
            if ('акция' == item.happeningWithProduct) {
                put_slider_item_to('.slider_stocks_inner', create_slider_item(item));
            }
        });
    }).then(() => {
        stocks_slider.render();
        ibg();
    });
}


export {
    init_stock_slider,
    stocks_slider
};