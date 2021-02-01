function placeholderInputs() {
    let inputs = document.querySelectorAll('._form_input');
    inputs.forEach(input => {
        let prevPlaceholder = input.placeholder;
        input.value = prevPlaceholder;
        input.addEventListener('focus', () => {
            if (input.value == prevPlaceholder) {
                input.value = '';
                input.placeholder = '';
            }
        });
        input.addEventListener('blur', () => {
            if (input.value == '' || input.value == prevPlaceholder || input.value == ' ') {
                input.value = prevPlaceholder;
                input.placeholder = prevPlaceholder;
            }
        });
    });
}
export default placeholderInputs;