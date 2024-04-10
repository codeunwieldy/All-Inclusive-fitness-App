const emailInput = document.querySelector('.email-input');
const spEmailLabel = document.querySelector('.sp-email-label');
const passwordInput = document.querySelector('.password-input');
const spPasswordLabel = document.querySelector('.sp-password-label');

emailInput.addEventListener('input', function() {
    if (emailInput.value === '') {
        spEmailLabel.style.color = '#000000'; // Change color if input is empty
        emailInput.style.fontWeight = ''; // Make text bold when input is not empty
    } else {
        spEmailLabel.style.color = 'transparent'; // Change color if input is not empty
        emailInput.style.fontWeight = 'bold'; // Make text bold when input is not empty
    }  
});


passwordInput.addEventListener('input', function() {
    if (passwordInput.value === '') {
        spPasswordLabel.style.color = '#000000'; // Change color if input is empty
        passwordInput.style.fontWeight = ''; // Make text bold when input is not empty
    } else {
        spPasswordLabel.style.color = 'transparent'; // Change color if input is not empty
        passwordInput.style.fontWeight = 'bold'; // Make text bold when input is not empty
    } 
});
