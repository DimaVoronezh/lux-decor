function phoneMask(inputSelector) {
    let inputs = document.querySelectorAll(inputSelector);
    inputs.forEach(input => {
        input.addEventListener('focus', createMask);
        input.addEventListener('input', createMask);
        input.addEventListener('blur', createMask);
    });

    function createMask(e) {
        e.preventDefault();
        let mask = '(___)  ___  __  __';
        let i = 0;
        let value = this.value.replace(/\D/g, '');
        this.value = mask.replace(/./g, (a) => {
            if (/_/.test(a) && i < value.length) {
                return value.charAt(i++);
            } else {
                return a;
            }
        });
        // 
        let position;
        if (/\d/.test(this.value)) {
            this.value.match(/./g).forEach((item, i) => {
                if (/\d/.test(item)) {
                    position = i + 1;
                }
            });
        }
        this.setSelectionRange(position, position)
    }
}
export default phoneMask;