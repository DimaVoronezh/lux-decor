function tabs() {
    let triggers = document.querySelectorAll('._tab_trigger_');
    let content = document.querySelectorAll('._tab_content_');
    hideContent();
    showContent();

    triggers.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            hideContent();
            showContent(i);
        });
    });

    function hideContent() {
        content.forEach((item, i) => {
            item.style.display = 'none';
            item.classList.remove('animationOnCreatingItem');
        });
        triggers.forEach((item, i) => {
            item.classList.remove('active');
        });
    }

    function showContent(i = 0) {
        triggers[i].classList.add('active');
        content[i].style.display = 'block';
        content[i].classList.add('animationOnCreatingItem');
    }
}

export default tabs;