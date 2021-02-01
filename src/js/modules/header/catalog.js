function catalog() {
    let startHeightOfCatalog;
    let catalog_first_floor = document.querySelector('.catalog_first_floor');
    let catalog_title_main = document.querySelector('.main_catalog-title');
    let first_floor_items = document.querySelectorAll('.catalog_first_floor>.first_floor-item');
    let second_floor_items = document.querySelectorAll('.second_floor-item');
    let all_second_floor_list = document.querySelectorAll('.catalog_second_floor');

    let arrowBlack = './img/icons/arrodgrown.png';
    let arrowWhite = './img/icons/arrowDown.png';
    // 
    function catalogOpening({
        transitionDurationState
    }) {
        let opening = false;
        catalog_first_floor.style.transitionDuration = transitionDurationState + 'ms';
        catalog_title_main.addEventListener('click', (e) => {
            startHeightOfCatalog = catalog_first_floor.scrollHeight;
            e.preventDefault();
            catalog_first_floor.style.overflow = `hidden`;
            // запрещаю клик во время анимации
            if (opening) {
                return;
            }
            opening = true;
            setTimeout(() => {
                opening = false;
            }, transitionDurationState);

            if (parseInt(window.getComputedStyle(catalog_first_floor).maxHeight) == 0) {
                catalog_first_floor.style.maxHeight = `${startHeightOfCatalog}px`;
                catalog_title_main.classList.add('active');
                setTimeout(() => {
                    catalog_first_floor.style.overflow = `visible`;
                }, transitionDurationState)
            } else {
                catalog_first_floor.style.maxHeight = '0px';
                catalog_title_main.classList.remove('active');
                if (window.matchMedia('(max-width: 1024px').matches) {
                    catalogNullOnMobile();
                }
            }
        });
    }
    catalogOpening({
        transitionDurationState: 350
    });
    // 
    // 
    // 
    function secondFloorOpening() {
        let startWidth = parseInt(window.getComputedStyle(first_floor_items[0]).width);
        first_floor_items.forEach(item => {
            let second_floor_list;
            try {
                second_floor_list = item.querySelector('.catalog_second_floor');
            } catch (e) {}

            if (window.matchMedia('(min-width: 1025px)').matches) {
                try {
                    second_floor_list.style.maxWidth = `0px`;
                } catch (e) {}
                item.addEventListener('mouseenter', () => {
                    all_second_floor_list.forEach(elem => {
                        elem.style.maxWidth = `0px`;
                    });
                    item.classList.add('active');
                    try {
                        second_floor_list.style.maxWidth = `${startWidth}px`;
                        item.children[0].children[0].children[0].children[1].src = arrowBlack;
                    } catch (e) {}
                });
                item.addEventListener('mouseleave', () => {
                    try {
                        item.children[0].children[0].children[0].children[1].src = arrowWhite;
                        second_floor_list.style.maxWidth = `0px`;
                        item.classList.remove('active');
                    } catch (e) {}
                    all_second_floor_list.forEach(elem => {
                        elem.style.maxWidth = `0px`;
                    });
                });
            }

            if (window.matchMedia('(max-width: 1024px)').matches) {
                second_floor_list.style.maxHeight = '0px';
                try {
                    second_floor_list = item.querySelector('.catalog_second_floor');
                } catch (e) {}
                let height;
                item.addEventListener('click', (e) => {
                    height = second_floor_list.scrollHeight; //высота каждого второго уровня
                    if (e.target.nodeName == 'IMG') {
                        e.preventDefault();
                        if (item.classList.contains('active')) {
                            item.classList.remove('active');
                            second_floor_list.style.maxHeight = `0px`;
                            item.children[0].children[0].children[0].children[1].src = arrowWhite;
                            catalog_first_floor.style.maxHeight = startHeightOfCatalog + 'px';
                            return;
                        }
                        catalogNullOnMobile();
                        if (!item.classList.contains('active')) {
                            item.classList.add('active');
                            second_floor_list.style.maxHeight = `${height}px`;
                            item.children[0].children[0].children[0].children[1].src = arrowBlack;
                            catalog_first_floor.style.maxHeight = startHeightOfCatalog + height + 'px'; //увеличиваю общую высоту при открытия внутренностей
                        }
                    }
                });
            }
        });
        second_floor_items.forEach(item => {
            if (window.matchMedia('(min-width: 1025px)').matches) {
                item.addEventListener('mouseenter', () => {
                    item.classList.add('active');
                });
                item.addEventListener('mouseleave', () => {
                    item.classList.remove('active');
                });
            }
        });
    }
    secondFloorOpening();

    function catalogNullOnMobile() {
        first_floor_items.forEach(item => {
            item.classList.remove('active');
            item.children[0].children[0].children[0].children[1].src = arrowWhite;
        });
        all_second_floor_list.forEach(elem => {
            elem.style.maxHeight = `0px`;
        });
    }
}
export default catalog;