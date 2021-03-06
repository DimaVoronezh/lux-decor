export default class Slider {
    constructor(obj) {
        this.settings = obj;
        this.updateSlider(this.settings);
    }
    // 
    updateSlider = (obj) => {
        let {
            sliderSelector,
            sliderArrowLeft,
            sliderArrowRight,
            slidesToShow,
            mediaRequstes,
            swipeSlidesCount,
            dots,
            scrollByMouse,
            scrollByTouch,
            dragByTouch,
            dragByMouse,
            distanceToScrollToSwipe,
            scrollByWheel,
            transitionDuration,
            transitionProperty,
            adaptiveHeight,
            autoPlay,
            autoPlayingInterval,
            waitForAnimation,
            arrows,
            infinity,
            centerMode,
            progressLine,
            peremen
        } = obj;
        if (!document.querySelector(sliderSelector)) {
            return;
        }

        this.sliderSelector = sliderSelector;
        this.sliderArrowLeft = sliderArrowLeft;
        this.sliderArrowRight = sliderArrowRight;
        this.infinity = infinity;
        this.centerMode = centerMode;
        this.progressLine = progressLine;
        this.slidesToShow = slidesToShow;
        this.swipeSlidesCount = swipeSlidesCount;
        if (this.swipeSlidesCount > this.slidesToShow) {
            this.swipeSlidesCount = this.slidesToShow;
        }
        this.dots = dots;
        this.scrollByMouse = scrollByMouse;
        this.scrollByTouch = scrollByTouch;
        this.dragByTouch = dragByTouch;
        this.dragByMouse = dragByMouse;
        this.distanceToScrollToSwipe = distanceToScrollToSwipe;
        this.scrollByWheel = scrollByWheel;
        this.transitionDuration = transitionDuration;
        this.transitionProperty = transitionProperty;
        this.adaptiveHeight = adaptiveHeight;
        this.autoPlay = autoPlay;
        this.autoPlayingInterval = autoPlayingInterval;
        this.waitForAnimation = waitForAnimation;
        if (this.infinity) {
            this.waitForAnimation = true;
        }
        this.arrows = arrows;
        this.mediaRequstes = mediaRequstes;

        this.slider = document.querySelector(this.sliderSelector);
        this.wrapper = this.slider.querySelector(`${this.sliderSelector}_wrapper`);
        this.inner = this.wrapper.querySelector(`${this.sliderSelector}_inner`);
        this.slides = this.inner.children; //можно заменить на QS
        if (this.slidesToShow > this.slides.length) {
            this.slidesToShow = this.slides.length;
        }
        if (this.arrows) {
            this.arrowPrev = this.slider.querySelector(this.sliderArrowLeft);
            this.arrowNext = this.slider.querySelector(this.sliderArrowRight);
        }
        this.mediasReqs();

        this.wrapperWidth = parseFloat(window.getComputedStyle(this.wrapper).width);
        this.btnsWrapper = document.createElement('ul');
        this.btnsWrapper.classList.add('slider_btns');
        this.slideWidth = this.wrapperWidth / this.slidesToShow;
        this.translateInnerByWidthSlide = this.slideWidth * this.swipeSlidesCount;
        this.translateInner = this.translateInnerByWidthSlide;

        this.arrowPrev;
        this.arrowNext;
        this.btns = [];
        this.currentSlide = 0;
        this.prevCountSlide = this.currentSlide;
        this.startPos;
        this.endPos;
        this.timer;
        this.canClickToNextSlide = true;
        this.nullTransinionsTimer;
        this.distanceToSwipeByLeftSlides = 0;
        this.centerSlide = Math.floor(this.slidesToShow / 2);
        this.wheelCounterDistance = 0;
        this.peremen = peremen;

        this.inner.style.width = this.slides.length * this.slideWidth + 'px';
        this.slides.forEach((item, i) => {
            item.style.flex = `0 0 ${this.slideWidth + 'px'}`;
        });
    }
    nullSliderBeforeUpdate = () => {
        try {
            let dots = this.slider.querySelector('.slider_btns');
            dots.remove();
        } catch (e) {}

        for (const key in this) {
            if (typeof (this[key]) == 'function' || key == 'settings' || key == 'currentSlide') {
                continue;
            }
            this[key] = null;
        }
        this.updateSlider(this.settings);
    }
    // 
    render = () => {
        if (!document.querySelector(this.sliderSelector)) {
            return;
        }
        this.nullSliderBeforeUpdate();
        // 
        // инициализация
        this.transitionsInner();
        this.createDotsInit();
        this.centerModeInit();
        this.adaptiveHeightInit();
        this.autoPlayingInit();
        this.progressLineInit();
        // инициализация кнопок и стрелок
        this.classArrowsOnEnd();
        this.activeDotsClass();
        // 
        // 
        // работа
        if (this.dots) {
            this.btns.forEach(item => {
                item.addEventListener('click', this.initDotListener);
            });
        }
        // 
        if (this.scrollByWheel) {
            this.wrapper.addEventListener('wheel', this.initWheelListener);
        }
        // 
        if (this.arrows) {
            this.arrowPrev.addEventListener('click', this.initPrevArrowListener);
            this.arrowNext.addEventListener('click', this.initNextArrowListener);
        }
        // 
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            if (this.scrollByTouch) {
                this.wrapper.addEventListener('touchstart', this.initTouchStartListener);
                this.wrapper.addEventListener('touchend', this.initTouchEndListener);
                this.wrapper.addEventListener('touchmove', this.initDragTouchListener);
            }
        }
        // 
        else {
            if (this.scrollByMouse) {
                this.wrapper.addEventListener('selectstart', this.initPreventDefault);
                this.wrapper.addEventListener('mousedown', this.initMouseDownListener);
                this.wrapper.addEventListener('mouseup', this.initScrollByMouseListeners);
                this.wrapper.addEventListener('mouseleave', this.initScrollByMouseListeners);
            }
        }
    }
    // 
    // 
    // 
    initPreventDefault = (e) => {
        e.preventDefault();
    }
    initScrollByMouseListeners = (e) => {
        this.calcItemsLeft();
        if (this.itemsLeft < this.swipeSlidesCount && this.itemsLeft > 0) {
            this.calcDistanceToSwipeByLeftSlides();
        }
        // 
        if (this.slides.length - 1 < this.swipeSlidesCount) {
            return;
        }
        if (this.canClickToNextSlide === false) {
            return;
        }
        // 
        if (this.scrollByMouse) {
            this.endPos = e.pageX;
            if (this.endPos >= this.startPos + this.distanceToScrollToSwipe) {
                if (this.itemsLeft > 0) {
                    this.currentSlide++;
                }
            }
            if (this.endPos <= this.startPos - this.distanceToScrollToSwipe) {
                if (this.currentSlide != 0) {
                    this.currentSlide--;
                }
            }
            if (this.currentSlide == 0) {
                this.distanceToSwipeByLeftSlides = 0;
            }
        }
        // 
        if (this.dragByMouse) {
            this.inner.removeEventListener('mousemove', this.initDragMouseListener);
        }
        this.startPos = undefined; //потому что будет считаться относительно 0 при событии mouseleave;
        this.centerModeTransitions();
        this.activeDotsClass();
        this.adaptiveHeightSlider();
        this.autoPlaying();
        this.transitionsInner();
        this.classArrowsOnEnd();
        this.progressLineTransition();
    }
    initMouseDownListener = (e) => {
        if (!this.canClickToNextSlide) {
            return;
        }
        this.startPos = e.pageX;
        if (this.dragByMouse) {
            this.inner.addEventListener('mousemove', this.initDragMouseListener);
        }
        clearInterval(this.timer);
        clearInterval(this.nullTransinionsTimer);
    }
    initDragMouseListener = (e) => {
        if (this.dragByMouse) {
            let move = e.pageX - this.startPos;
            let translate = +this.inner.style.transform.match(/\d+/g)[0];
            if (translate > (this.slides.length - this.slidesToShow) * this.slideWidth) {
                return;
            }
            if (!this.canClickToNextSlide) {
                return;
            }
            this.calcItemsLeft()
            if ((this.itemsLeft == 0 || this.itemsLeft) < 0 && e.pageX > this.startPos) {
                return;
            }
            this.inner.style.transform = `translateX(-${this.currentSlide * this.translateInner + this.distanceToSwipeByLeftSlides + move + 'px'})`;
        }
    }
    // 
    // 
    initDragTouchListener = (e) => {
        if (this.dragByTouch) {
            let move = e.targetTouches[0].pageX - this.startPos;
            let translate = +this.inner.style.transform.match(/\d+/g)[0];
            if (translate > (this.slides.length - this.slidesToShow) * this.slideWidth) {
                return;
            }
            if (!this.canClickToNextSlide) {
                return;
            }
            this.calcItemsLeft();
            if ((this.itemsLeft == 0 || this.itemsLeft) < 0 && e.targetTouches[0].pageX > this.startPos) {
                return;
            }
            this.inner.style.transform = `translateX(-${this.currentSlide * this.translateInner + this.distanceToSwipeByLeftSlides + move + 'px'})`;
        }
    }
    initTouchEndListener = (e) => {
        this.calcItemsLeft();
        if (this.itemsLeft < this.swipeSlidesCount && this.itemsLeft > 0) {
            this.calcDistanceToSwipeByLeftSlides();
        }
        // 
        if (this.slides.length - 1 < this.swipeSlidesCount) {
            return;
        }
        if (this.canClickToNextSlide === false) {
            return;
        }
        // 
        this.endPos = e.changedTouches[0].pageX;
        if (this.endPos >= this.startPos + this.distanceToScrollToSwipe) {
            if (this.itemsLeft == 0 || this.itemsLeft < 0) {
                return;
            }
            if (this.itemsLeft > 0) {
                this.currentSlide++;
            }
        }
        if (this.endPos <= this.startPos - this.distanceToScrollToSwipe) {
            if (this.currentSlide != 0) {
                this.currentSlide--;
            }
        }
        if (this.currentSlide == 0) {
            this.distanceToSwipeByLeftSlides = 0;
        }
        this.startPos = undefined;
        this.centerModeTransitions();
        this.activeDotsClass();
        this.adaptiveHeightSlider();
        this.autoPlaying();
        this.transitionsInner();
        this.classArrowsOnEnd();
        this.progressLineTransition();
    }
    initTouchStartListener = (e) => {
        this.startPos = e.touches[0].pageX;
        clearInterval(this.nullTransinionsTimer);
        clearInterval(this.timer);
    }
    // 
    // 
    initDotListener = (e) => {
        e.preventDefault();
        this.btns.forEach((item, i) => {
            if (e.target == item) {
                /*для анимации нужно, чтобы не ждать конца действия(при dragBy)*/
                if (this.currentSlide == i) {
                    return;
                }

                this.currentSlide = i;
            }
        });
        if (this.canClickToNextSlide === false) {
            return;
        }
        // 
        this.centerSlide = Math.floor(this.slidesToShow / 2) + this.currentSlide;
        // 
        if (this.currentSlide == 0) {
            this.distanceToSwipeByLeftSlides = 0;
        }
        // 
        this.calcItemsLeft();
        if (this.itemsLeft < 0) {
            this.itemsLeft = this.swipeSlidesCount - Math.abs(this.itemsLeft);
            this.calcDistanceToSwipeByLeftSlides();
        }
        // 
        this.centerModeTransitions();
        this.activeDotsClass();
        this.classArrowsOnEnd();
        this.adaptiveHeightSlider();
        this.autoPlaying();
        this.transitionsInner();
        this.progressLineTransition();
    }
    initNextArrowListener = (e) => {
        console.log('click');
        e.preventDefault();
        e.stopPropagation();
        // остаток слайдов, если их меньше, чем в свайпах
        /*когда остается сладов меньше, чем слайдов прокрутки за "раз", то я высчитываю, сколько их осталось, и от количества слайдов показанных отнимаю оставшийся слайд, затем перемножаю на ширину слайде, получаю значение на сколько нужно сдвинуть "иннер", а затем отнимаю в методе transitioniner это значение*/
        this.calcItemsLeft();
        if (this.itemsLeft < this.swipeSlidesCount && this.itemsLeft > 0) {
            this.calcDistanceToSwipeByLeftSlides();
        }
        // 
        if (this.itemsLeft == 0 || this.itemsLeft < 0) {
            return;
        }
        if (this.canClickToNextSlide === false) {
            return;
        }
        if (this.slides.length - 1 < this.swipeSlidesCount) {
            return;
        }
        if (this.itemsLeft > 0) {
            this.currentSlide++;
        }
        // if (this.currentSlide < Math.floor((this.slides.length - 1) / this.swipeSlidesCount)) {
        //     this.currentSlide++;
        // } тут баг(неверный расчет был при  slidesToShow: 1.4,swipeSlidesCount: 1.1, и при 7 слайдах)
        if (this.centerMode) {
            this.centerSlide++;
        }
        // 
        this.centerModeTransitions();
        this.activeDotsClass();
        this.adaptiveHeightSlider();
        this.autoPlaying();
        this.transitionsInner();
        this.classArrowsOnEnd();
        this.progressLineTransition();
    }
    initPrevArrowListener = (e) => {
        e.preventDefault();
        e.stopPropagation();
        /*это убрать, если хотим ITEMSleft только в конце листания вправо */
        if (this.currentSlide == 1) {
            this.distanceToSwipeByLeftSlides = 0;
        }
        // 
        if (this.currentSlide == 0) {
            return;
        }
        if (this.canClickToNextSlide === false) {
            return;
        }
        if (this.currentSlide != 0) {
            this.currentSlide--;
        }
        if (this.centerMode) {
            this.centerSlide--;
        }
        this.centerModeTransitions();
        this.activeDotsClass();
        this.adaptiveHeightSlider();
        this.autoPlaying();
        this.transitionsInner();
        this.classArrowsOnEnd();
        this.progressLineTransition();
    }
    initWheelListener = (e) => {
        e.preventDefault();
        this.wheelCounterDistance = this.wheelCounterDistance + e.deltaY;
        if (this.wheelCounterDistance < 0 && this.currentSlide == 0) {
            this.wheelCounterDistance = 0;
            return;
        }
        if (this.wheelCounterDistance > 0 && (this.itemsLeft < 0 || this.itemsLeft == 0)) {
            this.wheelCounterDistance = 0;
            return;
        }
        // 
        if (this.wheelCounterDistance > 0 && this.wheelCounterDistance > 100) {
            this.wheelCounterDistance = 0;
            this.calcItemsLeft();
            if (this.itemsLeft < this.swipeSlidesCount && this.itemsLeft > 0) {
                this.calcDistanceToSwipeByLeftSlides();
            }
            // 
            if (this.canClickToNextSlide === false) {
                return;
            }
            if (this.slides.length - 1 < this.swipeSlidesCount) {
                return;
            }
            if (this.itemsLeft > 0) {
                this.currentSlide++;
            }
            if (this.centerMode) {
                this.centerSlide++;
            }
            this.centerModeTransitions();
            this.activeDotsClass();
            this.adaptiveHeightSlider();
            this.autoPlaying();
            this.transitionsInner();
            this.classArrowsOnEnd();
            this.progressLineTransition();
        }
        if (this.wheelCounterDistance < 0 && this.wheelCounterDistance < -100) {
            this.wheelCounterDistance = 0;
            if (this.currentSlide == 1) {
                this.distanceToSwipeByLeftSlides = 0;
            }
            // 
            if (this.canClickToNextSlide === false) {
                return;
            }
            if (this.currentSlide != 0) {
                this.currentSlide--;
            }
            if (this.centerMode) {
                this.centerSlide--;
            }
            this.centerModeTransitions();
            this.activeDotsClass();
            this.adaptiveHeightSlider();
            this.autoPlaying();
            this.transitionsInner();
            this.classArrowsOnEnd();
            this.progressLineTransition();
        }
    }
    // 
    // 
    calcDistanceToSwipeByLeftSlides = () => {
        this.distanceToSwipeByLeftSlides = (this.swipeSlidesCount - this.itemsLeft) * -this.slideWidth;
    }
    calcItemsLeft = () => {
        this.itemsLeft = this.slides.length - this.slidesToShow - (this.currentSlide * this.swipeSlidesCount);
    }
    // 
    // 
    mediasReqs = () => {
        for (let key in this.mediaRequstes) {
            if (window.matchMedia(`(max-width: ${key})`).matches) {
                let {
                    slidesToShow,
                    swipeSlidesCount
                } = this.mediaRequstes[key];
                this.slidesToShow = slidesToShow;
                this.swipeSlidesCount = swipeSlidesCount;
                if (this.slidesToShow > this.slides.length) {
                    this.slidesToShow = this.slides.length;
                }
                if (this.swipeSlidesCount > this.slidesToShow) {
                    this.swipeSlidesCount = this.slidesToShow;
                }
            }
        }
    }
    // 
    // 
    classArrowsOnEnd = () => {
        if (this.arrows) {
            this.calcItemsLeft();
            this.arrowPrev.classList.remove('nonActive');
            this.arrowNext.classList.remove('nonActive');
            // 
            if (this.currentSlide == 0) {
                this.arrowPrev.classList.add('nonActive');
            }
            if (this.itemsLeft == 0 || this.itemsLeft < 0) {
                this.arrowNext.classList.add('nonActive');
            }
        }
    }
    // 
    // 
    autoPlayingInit = () => {
        if (this.autoPlay) {
            this.autoPlaying();
            this.wrapper.addEventListener('mouseenter', () => {
                clearInterval(this.timer);
            });
            this.wrapper.addEventListener('mouseleave', () => {
                this.autoPlaying();
            });
        }
    }
    autoPlaying = () => {
        if (this.autoPlay) {
            clearInterval(this.timer);
            this.timer = setTimeout(() => {
                this.calcItemsLeft();
                if (this.itemsLeft < this.swipeSlidesCount && this.itemsLeft > 0) {
                    this.calcDistanceToSwipeByLeftSlides();
                }
                // 
                if (this.itemsLeft > 0) {
                    this.currentSlide++;
                }
                if (this.itemsLeft == 0 || this.itemsLeft < 0) {
                    this.currentSlide = 0;
                    this.distanceToSwipeByLeftSlides = 0;
                    if (this.centerMode) {
                        this.centerSlide = 0;
                    }
                }
                // 
                if (this.centerMode) {
                    this.centerSlide++;
                }
                // 
                this.centerModeTransitions();
                this.activeDotsClass();
                this.transitionsInner();
                this.adaptiveHeightSlider();
                this.autoPlaying();
            }, this.autoPlayingInterval);
        }
    }
    // 
    // 
    transitionsInner = () => {
        this.inner.style.transition = `${this.transitionDuration}ms all ${this.transitionProperty}`;
        this.inner.style.transform = `translateX(-${this.currentSlide * this.translateInnerByWidthSlide + 
            this.distanceToSwipeByLeftSlides + 'px'})`;
        /*Если мы хотим , чтобы работа "оставшихся слайдов была только в конце листания вправо, то добавляем это действие, и убираем условие в PREVBTN , где сравниваем первый слайд , а затем обнуляем"*/
        // this.distanceToSwipeByLeftSlides = 0; 

        /*условие проверяет, если предыдущий слайд не равняется настоящему, после события, то мы двигаем inner , а затем в предыдущий слайд устанавливаем значение настоящего и получается круг
        без этого условия, при клике на активный уже слайд , все равно надо будет ждать вреия transition inner, чтобы затем снова попробовать переключить слайд*/
        if (this.prevCountSlide != this.currentSlide) {
            if (this.waitForAnimation) {
                this.canClickToNextSlide = false;
                setTimeout(() => {
                    this.canClickToNextSlide = true;
                }, this.transitionDuration);
            }
            this.prevCountSlide = this.currentSlide;
        }

        /*предствим ситуацию: пользователь кликает несколько раз по точке, где сейчас слайд и находится, каждый раз 
        запускается интервал обнуления стилей, чтобы можно было перетаскивать слайды без задержки, но если он сразу после
        этого кликнет в другую точку, то слайдер начнет перелистываться, и он не дойдя до конца анимации прервется, т.к.
        сработает обнуление стилей. Чтобы такого не было, каждый раз при клике на любую точку вызываем сначала clearIntreval
        и затем, если дальше кликов не последовало, то устанавливаем таймер на обнуление*/
        clearInterval(this.nullTransinionsTimer);
        this.nullTransinionsTimer = setTimeout(() => {
            this.inner.style.transition = ``;
        }, this.transitionDuration);
        // 
    }
    // 
    // 
    adaptiveHeightInit = () => {
        if (this.adaptiveHeight && this.slidesToShow == 1) {
            let heightInner = window.getComputedStyle(this.slides[this.currentSlide]).height;
            this.inner.style.height = heightInner;
        } else {
            this.adaptiveHeight = false;
        }
    }
    adaptiveHeightSlider = () => {
        if (this.adaptiveHeight) {
            this.slides.forEach((slide, j) => {
                if (this.currentSlide == j) {
                    let heightSlide = window.getComputedStyle(slide).height;
                    this.inner.style.height = heightSlide;
                }
            })
        }
    }
    // 
    // 
    activeDotsClass = () => {
        if (this.dots) {
            this.btns.forEach((item, i) => {
                item.classList.remove('active');
                item.classList.remove('nonActive');
                if (i == this.currentSlide) {
                    item.classList.add('active');
                    if (this.currentSlide == 0 || this.currentSlide == (this.slides.length - 1) / this.swipeSlidesCount) {
                        item.classList.add('nonActive');
                    }
                }
            });
        }
    }
    createDotsInit = () => {
        if (this.dots) {
            this.quantityDotsAndSlides = 0;
            // логика такая: к слайдам на странице прибавляю слайды в свайпе, и каждый цикл увеличиваю счетчик на один, и когда сумма слайдов в цике больше общего количества по факу, останавливаю 
            for (let sumSlides = this.slidesToShow;; sumSlides = sumSlides + this.swipeSlidesCount) {
                this.quantityDotsAndSlides++;
                if (sumSlides >= this.slides.length) {
                    break;
                }
            }
            for (let i = 0; i < this.quantityDotsAndSlides; i++) {
                let btn = document.createElement('li');
                btn.classList.add('slider_btn');
                this.btnsWrapper.append(btn);
                this.btns.push(btn);
            }
            this.wrapper.append(this.btnsWrapper);
            this.activeDotsClass();
        }
    }
    // 
    // 
    centerModeInit = () => {
        if (this.centerMode && this.slidesToShow % 2 != 0 &&
            this.slidesToShow != 1 && this.swipeSlidesCount == 1) {
            this.slides.forEach(item => {
                let backgroundOfItem = document.createElement('div');
                backgroundOfItem.classList.add('_center_mode_element');
                item.querySelector('.slider_main_item_body').append(backgroundOfItem);
            });
            this.centerModeTransitions();
        } else {
            this.centerMode = false;
        }
    }
    centerModeTransitions = () => {
        if (this.centerMode) {
            this.slides.forEach(item => {
                item.classList.remove('_center_mode');
            });
            setTimeout(() => {
                this.slides[this.centerSlide].classList.add('_center_mode');
            }, this.transitionDuration / 1.5);
        }
    }
    // 
    // 
    progressLineInit = () => {
        if (this.progressLine) {
            let line = document.createElement('div');
            let afterLine = document.createElement('div');
            afterLine.classList.add('_slider_progress_line_after');
            line.classList.add('_slider_progress_line');
            line.append(afterLine);
            this.slider.append(line);
            this.progressLineElement = document.querySelector(`${this.sliderSelector} ._slider_progress_line`);
            this.progressLineElementAfter = this.progressLineElement.querySelector('._slider_progress_line_after');
            this.widthOneSlideInProgressLine = this.wrapperWidth / (this.quantityDotsAndSlides - 1);
        }
    }
    progressLineTransition = () => {
        if (this.progressLine) {
            this.progressLineElementAfter.style.width = `${this.wrapperWidth - (this.currentSlide * this.widthOneSlideInProgressLine)}px`;
            // фикс пропажи бордера слева
            if (this.currentSlide == 0) {
                this.progressLineElementAfter.style.width = `100%`
            }
        }
    }
}