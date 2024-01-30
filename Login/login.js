


//to reset the Z-Index of the Logo-animation in the first

document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.querySelector('.join-logo-container');

    logoContainer.addEventListener('animationend', function() {
        logoContainer.remove();
        
    });
});


//this function open's the sign up page

function redirectToSignUp(){
    window.location.pathname = '/SignUP/signup.html';
}

//this function is to login as a guest

function loginAsGuest(){
    window.location.pathname = '/Summary/summary.html';
}

// this function is to login with your registered Email and Password

async function LoginRegistered(){
    const email = document.getElementById('login_email_input');
    const password = document.getElementById('login_password_input');

    try{
        users = JSON.parse(await getItem('users'));
        user = users.find(u => u.email === email.value && u.password === password.value);
    if(user){
        await setItem('userName', email.password)
        window.location.pathname = '/Summary/summary.html';}
    }catch(e){console.error('Loading erorr', e);
}
    
}



