    const emailInput = document.querySelector('.email-input');
    const spEmailLabel = document.querySelector('.sp-email-label');
    const passwordinput = document.querySelector('.password-input');
    const spPasswordLabel = document.querySelector('.sp-password-label');

    emailInput.addEventListener('input', function() {
        if (emailInput.value === '') {
            spEmailLabel.style.color = '#000000'; // Change color if input is empty
        } else {
            spEmailLabel.style.color = 'transparent'; // Change color if input is not empty
        }
       
    });
    passwordinput.addEventListener('input', function() {
        if (passwordinput.value === '') {
            spPasswordLabel.style.color = '#000000'; // Change color if input is empty
            } else {
                spPasswordLabel.style.color = 'transparent'; // Change color if input is not empty
            }
           
});
