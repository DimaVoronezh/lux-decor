function animationLinestAroundItem(selector) {
    let items = document.querySelectorAll(selector);
    if (items.length == 0) {
        return;
    }
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return;
    }
    items.forEach(item => {
        let animatedItem = item.querySelector('._my_animation_');
        let spans = animatedItem.children;
        item.addEventListener('mouseenter', (e) => {
            spans.forEach((elem, i) => {
                if (i % 2 != 0) {
                    elem.style.height = window.getComputedStyle(animatedItem).height;
                } else {
                    elem.style.width = window.getComputedStyle(animatedItem).width;
                }
            });
        });
        item.addEventListener('mouseleave', (e) => {
            spans.forEach((elem, i) => {
                if (i % 2 != 0) {
                    elem.style.height = 0;
                } else {
                    elem.style.width = 0;
                }
            });
        });
    });
}
export default animationLinestAroundItem;