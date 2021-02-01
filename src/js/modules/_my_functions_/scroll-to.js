function scrollTo({
    triggerSel,
    speed = 10,
    multiplySpeed = 0,
    ableToStopScroll = false
}) {
    let triggers = document.querySelectorAll(triggerSel);
    let canClick = true;
    let timer;
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            if (!canClick) {
                return;
            }
            canClick = false;
            let targetScrollTo = document.querySelector(`${trigger.hash}`);
            addKindOfListener();

            let targetOffset = targetScrollTo.offsetTop;
            let speedMulti = 0;

            timer = setInterval(() => {
                if (targetOffset > document.documentElement.scrollTop) {
                    document.documentElement.scrollTop += speed + speedMulti;
                    if (document.documentElement.scrollTop >= targetOffset ||
                        document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
                        nullAfterEnd();
                    }
                } else {
                    document.documentElement.scrollTop -= speed + speedMulti;
                    if (document.documentElement.scrollTop <= targetOffset) {
                        nullAfterEnd();
                    }
                }
                speedMulti += multiplySpeed;
            }, 1)
        });
    });

    function stopScrolling(e) {
        if (!ableToStopScroll) {
            e.preventDefault();
        } else {
            nullAfterEnd();
        }
    }

    function nullAfterEnd() {
        clearInterval(timer);
        canClick = true;
        removeKindOfListener();
    }

    function addKindOfListener() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.addEventListener('touchstart', stopScrolling, {
                passive: false
            });
        } else {
            document.addEventListener('wheel', stopScrolling, {
                passive: false
            });
        }
    }

    function removeKindOfListener() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.removeEventListener('touchstart', stopScrolling);
        } else {
            document.removeEventListener('wheel', stopScrolling);
        }
    }
}
export default scrollTo;