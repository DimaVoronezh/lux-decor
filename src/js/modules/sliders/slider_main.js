import Slider from "../_my_functions_/slider";
let main_slider;
try {
    main_slider = new Slider({
        sliderSelector: '.slider_main',
        arrows: true,
        sliderArrowLeft: '.slider_main .arrow_left',
        sliderArrowRight: '.slider_main .arrow_right',
        dots: true,
        scrollByMouse: true,
        dragByMouse: true,
        scrollByTouch: true,
        dragByTouch: true,
        distanceToScrollToSwipe: 150,
        scrollByWheel: true,
        transitionDuration: 500,
        transitionProperty: 'ease',
        adaptiveHeight: false,
        autoPlay: false,
        autoPlayingInterval: 2000,
        waitForAnimation: false,
        slidesToShow: 1,
        swipeSlidesCount: 1,
        centerMode: false,
        progressLine: true,
    });
} catch (e) {}

export default main_slider;