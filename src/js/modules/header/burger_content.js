function initBurgerMenu() {
    let burger_page = document.querySelector('.burger_page');
    let menu_list = document.querySelector('.header-bot-menu');
    let header_main_phones = document.querySelector('.header_main_phones-list');
    let header_main_message = document.querySelector('.header_main_message');
    let header_main_signin = document.querySelector('.header_main_signin');

    if (window.matchMedia('(max-width: 950px)').matches) {
        burger_page.append(menu_list);
        burger_page.append(header_main_phones);
    } else {
        document.querySelector('.header-bot-search').before(menu_list);
        document.querySelector('.header_main_signin').before(header_main_phones);
        document.querySelector('.header_main_signin').before(header_main_message);
    }
    if (window.matchMedia('(max-width: 600px)').matches) {
        burger_page.append(header_main_signin);
        burger_page.append(header_main_message);
    } else {
        document.querySelector('.header-top_row').append(header_main_message);
        document.querySelector('.header-top_row').append(header_main_signin);
    }
}
export default initBurgerMenu;