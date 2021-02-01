function showUpArrowByScroll() {
    let arrow = document.querySelector('._arrow_up');
    document.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop >= 600) {
            arrow.classList.add('active');
        } else {
            arrow.classList.remove('active');
        }
    });
}
export default showUpArrowByScroll;