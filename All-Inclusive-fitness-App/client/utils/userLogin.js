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


const createUser = async ({first_name,last_name,username,email,password,height,age,weight})=>{
    const body = {
        first_name,last_name,username,email,password,height,age,weight
    }
    
    try{
    const create = await fetch('http://localhost:5000/signUp',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body),
        credentials: "include",
        


    });
        if(!create.ok){
            throw new Error('Network response was not ok');
        }
        
    }
    catch(error){
        console.error('There was a problem with the fetch operation:', error);
    }


};      

const logInBtn = document.querySelector('.Login');
logInBtn.addEventListener('click', async ()=>{
    const login_email = document.querySelector('.email-input').value
    const login_pswrd = document.querySelector('.password-input').value
    const result = await logIN(login_email,login_pswrd);
    

})


const logIN = async (email,password)=>{
    const body = {
        email,password
    }
    
    try{
    const create = await fetch('http://localhost:5000/logIn',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body),
        credentials: "include",
        


    });
        if(!create.ok){
            throw new Error('Network response was not ok');
        }
        
        const data = await create.json();
        const{token, redirectUrl} = data
        localStorage.setItem('token',token)
        window.location.href = redirectUrl; 
    }
    catch(error){
        console.error('There was a problem with the fetch operation:', error);
    }


};      


