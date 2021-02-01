function tabs_animated({
    parentSel,
    contentSel,
    triggerSel,
    wrapperlineSel,
    lineSel
}) {
    let parent = document.querySelector(parentSel);
    let content = document.querySelectorAll(contentSel);
    let triggers = document.querySelectorAll(triggerSel);
    let wrapperline;
    let line;
    if (wrapperlineSel) {
        wrapperline = document.querySelector(wrapperlineSel);
        line = wrapperline.querySelector(lineSel);
    }
    let activeTab;

    hideTabs();
    showTab();
    changeLinePosition();

    triggers.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if (parent) {
                if (!parent.classList.contains('active')) {
                    return;
                }
            }
            if (activeTab == i) {
                return;
            }
            e.preventDefault();
            hideTabs();
            setTimeout(() => {
                showTab(i); /*можно в setTimeout завернуть для другой анимации */
            }, 10)
            changeLinePosition(i);
        });
    });

    function hideTabs() {
        content.forEach((item) => {
            item.style.opacity = '0';
            item.style.maxHeight = '0px';
            item.classList.remove('active');
        });
        triggers.forEach(item => {
            item.classList.remove('active');
        });
    }

    function showTab(i = 0) {
        activeTab = i;
        triggers[i].classList.add('active');
        content[i].style.opacity = '1';
        content[i].classList.add('active');
        content[i].style.maxHeight = `${content[i].scrollHeight}px`;
    }

    function changeLinePosition(i = 0) {
        if (wrapperlineSel) {
            if (i == 0) {
                line.style.left = '0px';
                return;
            }
            line.style.left = `${triggers[i].getBoundingClientRect().left - wrapperline.getBoundingClientRect().left}px`;
        }
    }
}

export default tabs_animated;