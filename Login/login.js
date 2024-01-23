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


