import Slider from "../_my_functions_/slider";

let goodToKnow_slider;
try {
    goodToKnow_slider = new Slider({
        sliderSelector: '.gootToKnow_slider',
        arrows: false,
        sliderArrowLeft: '.slider_stocks .arrow_left',
        sliderArrowRight: '.slider_stocks .arrow_right',
        dots: true,
        scrollByMouse: true,
        dragByMouse: true,
        scrollByTouch: true,
        dragByTouch: true,
        distanceToScrollToSwipe: 150,
        transitionDuration: 800,
        transitionProperty: 'ease-in-out',
        adaptiveHeight: false,
        autoPlay: false,
        autoPlayingInterval: 2000,
        waitForAnimation: false,
        slidesToShow: 2,
        mediaRequstes: {
            '600px': {
                slidesToShow: 1,
                swipeSlidesCount: 2
            },
        },
        swipeSlidesCount: 1,
    });
} catch (e) {}

export default goodToKnow_slider;