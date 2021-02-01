function header_bot() {
    let header_bot = document.querySelector('.header-bot_row');
    if (window.matchMedia('(max-width: 1030px)').matches) {
        document.querySelector('.header_row').after(header_bot);
    } else {
        document.querySelector('.header-top_row').after(header_bot);
    }
}
try {
    header_bot();
    window.addEventListener('resize', header_bot);
} catch (e) {}
export default header_bot;