
document.addEventListener('DOMContentLoaded', function() {
const logInBtn = document.querySelector('.Login');
logInBtn.addEventListener('click', async ()=>{
    const email = document.querySelector('.email-input').value
    const password = document.querySelector('.password-input').value
    const result = await signUp(email,password);
    

})



const signUp = async (email,password)=>{
    const body = {
        email,
        password
    }
    
    try{
    const create = await fetch('http://localhost:5000/signUp',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)


    });
        if(!create.ok){
            throw new Error('Network response was not ok');
        }
        
    }
    catch(error){
        console.error('There was a problem with the fetch operation:', error);
    }


};      

});
