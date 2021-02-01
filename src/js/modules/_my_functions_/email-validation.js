function emailValidation(inputSelector) {
    let inputs = document.querySelectorAll(inputSelector);
    inputs.forEach(item => {
        item.addEventListener('blur', checkEmail);
        item.addEventListener('focus', checkEmail);
        item.addEventListener('input', checkEmailOnWords);
    });

    function checkEmail() {
        if (!/[@.]/.test(this.value) && this.value.length != 0) {
            this.style.boxShadow = 'inset 0 0 0 2px red';
        }
    }

    function checkEmailOnWords(e) {
        if (/[а-яё]/g.test(this.value)) {
            this.value = this.value.substring(0, this.value.length - 1);
        }
        if (this.value.length == 0) {
            this.style.boxShadow = '';
        }
    }
}


export default emailValidation;