import ibg from "../_my_functions_/ibg";
import {
    getData
} from "../_my_functions_/internet";
import Slider from "../_my_functions_/slider";
import create_slider_item from "./create_slider_item";
import put_slider_item_to from "./put_slider_item_to";


let hits_slider = new Slider({
    sliderSelector: '.hits-section .slider_hits',
    arrows: true,
    sliderArrowLeft: '.slider_hits .arrow_left',
    sliderArrowRight: '.slider_hits .arrow_right',
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
    swipeSlidesCount: 1,
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
});

function init_hits_slider() {
    if (!document.querySelector('.slider_hits_inner')) {
        return;
    }
    getData('http://localhost:3000/products').then(data => {
        return data.forEach(item => {
            if ('хит' == item.happeningWithProduct) {
                put_slider_item_to('.slider_hits_inner', create_slider_item(item));
            }
        });
    }).then(() => {
        hits_slider.render();
        ibg();
    });
}

export {
    init_hits_slider,
    hits_slider
};