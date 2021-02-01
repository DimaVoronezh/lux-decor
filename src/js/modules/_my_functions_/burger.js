function burgerMenu() {
    let burger_menu = document.querySelector('.burger_menu');
    let burger_page = document.querySelector('.burger_page');
    let wrapper = document.querySelector('.wrapper');
    burger_menu.addEventListener('click', () => {
        burger_menu.classList.toggle('active');
        burger_page.classList.toggle('active');
        document.body.classList.toggle('lock');
        wrapper.classList.toggle('lock');
    });
}
export default burgerMenu;